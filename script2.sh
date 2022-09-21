#!/bin/bash

CYPRESS_DIRECTORY="$HOME/Documents/nindao-api-tests"
QR_CODE_DIRECTORY="$HOME/Library/Android/sdk/emulator/resources"

cd $CYPRESS_DIRECTORY/cypress/screenshots/login.spec.cy.js
mv qrcode.png $QR_CODE_DIRECTORY/custom.png