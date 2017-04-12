# https-node-demo

### More Information
This repo is intended to accompany my tutorial post over on [Medium]()

### Getting Started
- Once you fork/clone the repo:
  - run `npm install` to get all your packages installed
  - edit line 13 in `server/app.js` to your domain

### Setting up your keys
- Install certbot
- Ensure you have port 443 open to the outside world
- Run Certbot
  - Give option 2 for the first prompt
  - Input your domain when prompted
  - Keep note of the location of your key/cert files
    - The default is the directory `/etc/letsencrypt/live/*_DOMAIN_*/`
    - If yours are in a location other than the default, you'll have to modify lines 15 and 16 in `server/app.js`

### Running the Server
- run `sudo node server/app.js` from the main project directory
  - You will need to run this as root because by default only root can read the key files
  - Some linux servers will use the command `nodejs` instead of node