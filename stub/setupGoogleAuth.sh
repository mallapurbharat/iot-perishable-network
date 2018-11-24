#!/bin/bash
#created by Bharat Mallapur (bharatontech@gmail.com)

export COMPOSER_CARD=restadmin@iot-perishable-network

# we need to escape all the json parameters with \" as we need to 
# add google oauth ids to json. Otherwise we could escape main parentheses with  \'

export COMPOSER_PROVIDERS="{
  \"google\": {
        \"provider\": \"google\",
        \"module\": \"passport-google-oauth2\",
        \"clientID\": \"$GOOGLE_CLIENT_ID\",
        \"clientSecret\": \"$GOOGLE_CLIENT_SECRET\" ,
        \"authPath\": \"/auth/google\",
        \"callbackURL\": \"/auth/google/callback\",
        \"scope\": \"https://www.googleapis.com/auth/plus.login\",
        \"successRedirect\": \"/\",
        \"failureRedirect\": \"/\"
    }
}"

# COMPOSER_DATASOURCES='{
#     "db": {
#         "name": "db",
#         "connector": "mongodb",
#         "host": "mongo"
#     }
# }'
