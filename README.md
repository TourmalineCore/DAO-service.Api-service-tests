# Test launching guide
- [Test launching guide](#Test-launching-guide)
  - [Install dependencies](#Install-dependencies)
  - [Prepairing for tests](#Prepairing-for-tests)
    * [Api tests](#Api-tests)
    * [E2E tests](#E2E-tests)
  - [Run tests](#Run-tests)

## Install dependencies

First thing you have to do is install dependencies:

```
npm i
```
## Preparing for testing

First, you need move to **dao-service-stub** directory:

```
cd dao-service-stub
```

And then install all dependencies by `npm i` command

Afterall launch server - it is necessary for workability of the tests: 

```
npm start
```

- ### Api tests

  1. You need to changes some constants on your own data in the file **test/constants/index.js**.
  Don't forget to get the Telegram data

  2. Have WalletConnect session in Reddis database.

  3. Api bot is started.

- ### E2E tests

  1. You need to change `"baseUrl"` in the file **cypress.config.js** on your own url of web app.

  2. Start your DAO web app

## Run tests

- For run api-tests, write command:
```
npm run test
```

- For run cypress e2e-tests:
```
npm cy:run
```