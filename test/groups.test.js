const { spec, request } = require('pactum');
const { mockData, personalData } = require('./constants/index');
const { validSchemaGetDaoBalance } = require('./schemas/getDaoBalance');
const { validSchemaGetGroups } = require('./schemas/getGroups');
var chai = require('chai');
var fs = require('fs');
var path = require('path');
var expect = chai.expect;

request.setDefaultTimeout(50 * 1000); // 50 sec delay while user signed transaction

describe('Group api controllers test', () => {
  const{ BASE_URL } = process.env

  const mockGroupId = mockData.groupId;
  const mockOwnerId = mockData.ownerId;
  const mockParticipantsList = mockData.participantsList
  const mockPersonalData = personalData;
  const mockPersonalTelegramData = mockData.telegramPersonalData;

  const groupTitle = 'Test group name';
  let sessionBody;

it('create session by given data from file', async () => {
  const fileNameWithData = 'sessionData.txt';
  const pathToFile = path.join(__dirname, fileNameWithData); 
  try {
    sessionBody = fs.readFileSync(pathToFile, 'utf8');
    console.log(sessionBody);
  } catch (err) {
    console.log(err);
  }

  await spec()
    .post(`${BASE_URL}/walletConnectSessions`)
    .withHeaders('telegramData', JSON.stringify(mockPersonalTelegramData))
    .withBody(JSON.parse(sessionBody))
    .expectStatus(200);
});

it('should succesfully create new group', async () => {

  const requestBody = {
    "id": mockGroupId,
    "title": groupTitle,
    "owner": mockPersonalData
  }

  await spec()
    .post(`${BASE_URL}/groups/create`)
    .withJson(requestBody)
    .expectStatus(201);
});

it('should get all groups of custom user, one of which is the newly created', async () => {

  const expectedJsonSchema = validSchemaGetGroups

  await spec()
    .get(`${BASE_URL}/groups/?ownerId=${mockOwnerId}`)
    .withHeaders('telegramData', JSON.stringify(mockPersonalTelegramData))
    .expectStatus(200)
    .expectJsonSchema(expectedJsonSchema);
  });

it('should change state successfully', async () => {

  const requestBody = {
    "state": "DAO initialization"
  }

  await spec()
    .put(`${BASE_URL}/groups/${mockGroupId}`)
    .withJson(requestBody)
    .withHeaders('telegramData', JSON.stringify(mockPersonalTelegramData))
    .expectStatus(200);
  });

it('init DAO, should takes gnosis DAO address', async () => {

  const requestBody = {
    "groupId": mockGroupId,
    "owners": mockParticipantsList,
    "threshold": 1
  };

  console.log("APROVE INITING DAO IN YOUR METAMASK APP IN 50 SEC")

  await spec()
    .post(`${BASE_URL}/groups/initDao`)
    .withHeaders('telegramData', JSON.stringify(mockPersonalTelegramData))
    .withJson(requestBody)
    .expectStatus(201)
});

it('Try to init DAO that already is initialized', async () => {

  const requestBody = {
    "groupId": mockGroupId,
    "owners": mockParticipantsList,
    "threshold": 1
  };

  const expectedResponse = {
    "statusCode": 500,
    "message": "DAO has already been initialized"
}

  console.log("APROVE INITING DAO IN YOUR METAMASK APP IN 50 SEC")

  await spec()
    .post(`${BASE_URL}/groups/initDao`)
    .withHeaders('telegramData', JSON.stringify(mockPersonalTelegramData))
    .withJson(requestBody)
    .expectStatus(500)
    .expectJson(expectedResponse);
});

it('Check DAO balance for new created DAO group should work and contain zero balance', async () => {

  const expectedJsonSchema = validSchemaGetDaoBalance

  const expectedResponse = [{
    "balance": "0",
    "tokenSymbol": "ETH"
  }]

  const _spec = await spec()
    .get(`${BASE_URL}/dao/getBalance/${mockGroupId}`)
    .withHeaders('telegramData', JSON.stringify(mockPersonalTelegramData))
    .expectStatus(200)
    .expectJson(expectedResponse)
    .expectJsonSchema(expectedJsonSchema)
    .retry(3);

    expect(_spec.body[0].balance).to.equal('0');
    expect(_spec.body[0].tokenSymbol).to.equal('ETH');
  });

  it('Check DAO balance of non-exist group', async () => {

    const expectedResponse = {
      "statusCode": 500,
      "message": "Cannot read properties of null (reading 'DAOaddress')"
    }

    const nonExistGroup = -111111111
  
    await spec()
      .get(`${BASE_URL}/dao/getBalance/${nonExistGroup}`)
      .withHeaders('telegramData', JSON.stringify(mockPersonalTelegramData))
      .expectStatus(500)
      .expectJson(expectedResponse)
      .retry(3);
    });
});