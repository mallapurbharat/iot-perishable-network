#created by Bharat Mallapur (bharatontech@gmail.com)

export FABRIC_VERSION=hlfv12
export FABRIC_START_TIMEOUT=30
export FABRIC_INSTALL_DIR=~/fabric-dev-servers

#remove all business cards from local folder
rm -f ./*.card
#remove old cards
composer card delete -c restadmin@iot-perishable-network
composer card delete -c admin@iot-perishable-network
composer card delete -c farmer@iot-perishable-network
composer card delete -c shipper@iot-perishable-network
composer card delete -c supermarket@iot-perishable-network

$FABRIC_INSTALL_DIR/teardownFabric.sh
rm -Rf ~/.composer/*
$FABRIC_INSTALL_DIR/startFabric.sh
$FABRIC_INSTALL_DIR/createPeerAdminCard.sh

composer archive create -t dir -n . -a dist/iot-perishable-network.bna
echo Installing the blockchain solution to Fabric Network
composer network install -a dist/iot-perishable-network.bna -c PeerAdmin@hlfv1

echo Starting the network.
composer network start -n iot-perishable-network -V 0.2.6 -A admin -S adminpw -c PeerAdmin@hlfv1 -f networkadmin.card

composer card import -f networkadmin.card

composer participant add -c admin@iot-perishable-network -d '{"$class":"org.hyperledger.composer.system.NetworkAdmin", "participantId":"restadmin"}'
composer identity issue -x true -c admin@iot-perishable-network -f restadmin@iot-perishable-network.card -u restadmin -a "resource:org.hyperledger.composer.system.NetworkAdmin#restadmin"
composer card import -f  restadmin@iot-perishable-network.card
composer network ping -c restadmin@iot-perishable-network

##submit setupDemo transaction to test the network as well as create sample participants
composer transaction submit -c restadmin@iot-perishable-network -d '{"$class":"org.acme.shipping.perishable.SetupDemo"}'


#create cards for each participant created during setupDemo transaction
composer identity issue -c restadmin@iot-perishable-network -u farmer -a 'resource:org.acme.shipping.perishable.Grower#farmer@email.com'
composer identity issue -c restadmin@iot-perishable-network -u shipper -a 'resource:org.acme.shipping.perishable.Shipper#shipper@email.com'
composer identity issue -c restadmin@iot-perishable-network -u supermarket -a 'resource:org.acme.shipping.perishable.Importer#supermarket@email.com'

#create new exported cards for further use in REST API server interaction
for fullfile in ./*.card; do
name=$(basename -- "$fullfile")
name="${name%.*}"
#echo "$fullfile"
#echo "$name"
#echo "$name"_exp.card
    composer card import -f "$fullfile"
    composer card export -f "$name"_exp.card -c "$name"; 
    rm "$fullfile"
done
