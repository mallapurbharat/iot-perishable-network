#created by Bharat Mallapur (bharatontech@gmail.com)

source ../../setupAuthCredentials.sh
source ./setupGoogleAuth.sh
#echo $COMPOSER_PROVIDERS
#echo $COMPOSER_CARD
#auth true
composer-rest-server -c restadmin@iot-perishable-network -a true
# multi-user true, auth true (default when multi-user is set to true)
#composer-rest-server -c restadmin@iot-perishable-network -m true
    