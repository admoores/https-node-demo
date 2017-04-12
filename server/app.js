'use strict'

const express = require('express');
const fs = require('fs');
const https = require('https');

const domainName = ''; // This will be whatever domain you used to register your certificates through Let's Encrypt

const key = fs.readFileSync('/etc/letsencrypt/live/' + domainName + '/privkey.pem');
const cert = fs.readFileSync('/etc/letsencrypt/live/' + domainName + '/fullchain.pem');

const app = express();

app.get('*', (req, res) => {
  res.send('Hello from my secure server!');
});

const server = https.createServer({
  key: key,
  cert: cert
}, app);

const port = 443;

server.listen(port, () => {
  console.log('Listening securely on port ' + port);
});