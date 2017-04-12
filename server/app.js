// Most servers will only allow ES6 syntax in strict mode
'use strict'

//Importing our NPM packages
const express = require('express');
const fs = require('fs');
const https = require('https');

// Initialize a new instance of express
const app = express();

// This will be the same domain you used to register for Let's Encrypt
const domainName = ''; // Your Domain

const key = fs.readFileSync('/etc/letsencrypt/live/' + domainName + '/privkey.pem');
const cert = fs.readFileSync('/etc/letsencrypt/live/' + domainName + '/fullchain.pem');

// Creating and launching the instance of your HTTPS server
const server = https.createServer({
  key: key,
  cert: cert
}, app);

const port = 443; // 443 is default, but you can use anything

server.listen(port, () => {
  console.log('Listening securely on port ' + port);
});

// This will respond to any request to your server with the given string, just
//   to make sure the whole thing works.
app.get('*', (req, res) => {
  res.send('Hello from my secure server!');
});

// Here we put together a way to redirect clients to our HTTPS version if they try
//   to connect via HTTP's default port 80
const httpRedirect = express();

httpRedirect.get('*', (req, res) => {
  if (port === 443) { // If using default HTTPS port, then omits port from redirect
    res.redirect('https://' + domainName + req.url);
  } else { // Otherwise, will append port for you
    res.redirect('https://' + domainName + ':' + port + req.url);
  }
  console.log('HTTP request made, redirected to HTTPS');
});

httpRedirect.listen(80);