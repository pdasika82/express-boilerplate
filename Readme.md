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



## Installing nginx
wget http://nginx.org/download/nginx-1.2.1.tar.gz
tar -xzf wget nginx-1.2.1.tar.gz 
cd nginx-1.2.1
sudo apt-get install libpcre3-dev
./configure --prefix=/home/ubuntu/nginx_lb
make
make install

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
