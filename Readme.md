## Installing mongodb:

(http://www.mongodb.org/display/DOCS/Quickstart)

sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
Add the below line in /etc/apt/sources.list.d/10gen.list
deb http://downloads-distro.mongodb.org/repo/debian-sysvinit dist 10gen
sudo apt-get update
sudo apt-get install mongodb-10gen

sudo /etc/init.d/mongodb start
sudo /etc/init.d/mongodb stop
sudo /etc/init.d/mongodb restart

## Building the schema
node create.js
node seed/seed.js


## Installing node.js

sudo apt-get install g++ curl libssl-dev apache2-utils
sudo apt-get install git-core
sudo apt-get install make 


wget http://nodejs.org/dist/v0.6.18/node-v0.6.18.tar.gz

targ -xzf node-v0.6.18.tar.gz
cd node-v0.6.18
./configure
make
sudo make install


## Creating schema
node models/create.js

## Creating seed 
sh models/seed/create_seed.sh


## Setting up a test setup
Refer to this site : (http://unexpectedliteral.com/2012/05/09/automated-functional-testing-with-javascript-using-mocha-and-selenium-part-2/)

wget http://selenium.googlecode.com/files/selenium-server-standalone-2.24.1.jar -O /path/to/selenium/selenium-server-standalone.jar
java -jar /path/to/selenium/selenium-server-standalone.jar

## Install mocha globally
npm install -g mocha
##Install all the dependencies like chai, webdriverjs etc. 
npm install 

## Run tests
make test
 
## Run the server
node server.js


## License
(The MIT License)

Copyright (c) 2012 Pranil Dasika 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

