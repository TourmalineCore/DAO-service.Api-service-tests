// import { Decoder } from '@nuintun/qrcode'
// import WalletConnectHelper from '../helpers/walletConnectHelper'

const { assert } = require("chai");

describe('Test User Login', () => {

  it('My test', () => {
    cy.visit('http://localhost:3000');

    cy.contains('Connect').click();

    cy.get('.walletconnect-modal__base').screenshot('qrcode'); 

    cy.verifyDownload('sessionData.txt', { timeout: 30000});
  
  });

  // it('My test2', () => {
  //   const name = `screenshots/${screenshotName}`;

  //   cy.fixture(name, 'base64')
  //     .then(base64 => `data:image/png;base64,${base64}`)
  //     .then((imageSrc) => {
  //       const qrcode = new Decoder()
  //       return qrcode.scan(imageSrc)
  //     })
      // .its('data')
      // .then(async (data) => {
      //   const mockParams = {
      //     connect: {
      //       chainId: 4,
      //       accounts: ["0x2d0805db0736690c3f86a8cc40470abed54afc3e"],
      //     },
      //   }
      //   const walletConnectHelper = new WalletConnectHelper(data);
      //   await walletConnectHelper.initWallet(mockParams);
      // })
  // })
});