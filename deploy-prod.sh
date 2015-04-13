#!/bin/bash
cd /var/portal
rm -rf ManagementPortal
git clone https://github.com/harjuto/ManagementPortal.git
echo 'Cloning latest version...'
cd ManagementPortal
cd server
npm install
cd ../client
npm install
bower install
gulp
cd ../server
echo 'Starting server...'
node server.js
