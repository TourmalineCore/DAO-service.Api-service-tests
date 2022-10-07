#!/bin/bash

CYPRESS_DIRECTORY="$HOME/Documents/nindao-api-tests"
RESOURCES_DIRECTORY="$HOME/Library/Android/sdk/emulator/resources"

cd $CYPRESS_DIRECTORY/cypress/screenshots/login.spec.cy.js
mv qrcode.png $RESOURCES_DIRECTORY/custom.png