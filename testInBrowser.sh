#created by Bharat Mallapur (bharatontech@gmail.com)

# script to ease update and testing of bna file in composer playground

composer archive create -t dir -n . -a dist/iot-perishable-network.bna
google-chrome -incognito https://composer-playground.mybluemix.net/login

## we can use this to test the client app as well.
#google-chrome -incognito http://localhost:4200