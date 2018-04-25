## Hydra Scanner

#### How to run:
 - `git clone https://github.com/dkran/hydra-scanner`
 - `cd hydra-scanner`
 - `npm install`
 - `sudo node app.js`

#### What is this for?
 - Microservice to facilitate scanning the entire internet.
 - Scans an IP.  Don't worry, I have a fairly comprehensive exclude file, so my server should send you nothing that would be risky.
 - Reports back to a [`hydra-backend`](https://github.com/dkran/hydra-backend) server.  Doesn't really matter which one, but I will be setting up a main one soon as default.
 - Only scans a single IP.  On the backend masscan will gather ips' for this microservice to scan in full.  I later hope to use parallel scanning / threads to do this, but I'm reading Fyodor's book on nmap to get it right.

 