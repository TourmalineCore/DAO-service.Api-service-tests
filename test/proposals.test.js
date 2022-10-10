const { spec, request } = require('pactum');
const { mockData, proposalData, TransactionType } = require('./constants/index');

request.setDefaultTimeout(50 * 1000); // 50 sec delay while user signed transaction

describe('Transactions api controllers test', () => {
  const { BASE_URL } = process.env
  request.setBaseUrl(BASE_URL);

  const DaoGroupId = mockData.groupId;
  const mockOwnerId = mockData.ownerId;

  const mockAddressForAdd = proposalData.addressForAdd;
  const mockAddressForRemove = proposalData.addressForRemove;
  const mockAddressForTransferEth = proposalData.addressForTransferEth;
  const mockAddressForContract = proposalData.addressForContract;
  const mockPersonalTelegramData = mockData.telegramPersonalData;
  
  let proposalId;

  it('try to create non-exist proposal', async () => {

    const nonExistProposal = 'lorem inpsum'

    const requestBody = {
      "type": nonExistProposal,
      "userId": mockOwnerId,
      "groupId": DaoGroupId,
      "address": mockAddressForAdd,
      "threshold": 1
    }

    const expectedResponse = {
      "statusCode": 500,
      "message": "The proposal action lorem inpsum not found"
  }
    
    await spec()
    .post(`/proposals/create`)
    .withHeaders('telegramData', JSON.stringify(mockPersonalTelegramData))
    .withJson(requestBody)
    .expectStatus(500)
    .expectJson(expectedResponse)
    .retry(3);
});

  it('add participant proposal', async () => {

    const requestBody = {
      "type": TransactionType.ADD,
      "userId": mockOwnerId,
      "groupId": DaoGroupId,
      "address": mockAddressForAdd,
      "threshold": 1
    }

    console.log("APROVE TRANSACTION IN YOUR METAMASK APP IN 50 SEC")

    const _spec = await spec()
      .post(`/proposals/create`)
      .withHeaders('telegramData', JSON.stringify(mockPersonalTelegramData))
      .withJson(requestBody)
      .expectStatus(201)
      .retry(3);

    proposalId = _spec.body
  });

  it('remove participant proposal', async () => {

    const requestBody = {
      "type": TransactionType.REMOVE,
      "userId": mockOwnerId,
      "groupId": DaoGroupId,
      "address": mockAddressForRemove,
      "threshold": 1
    }

    console.log("APROVE TRANSACTION IN YOUR METAMASK APP IN 50 SEC")

    await spec()
      .post(`/proposals/create`)
      .withHeaders('telegramData', JSON.stringify(mockPersonalTelegramData))
      .withJson(requestBody)
      .expectStatus(201)
      .retry(3);
  });

  it('try to transfer ethers proposal, but DAO balance is zero', async () => {

    const expectedErrorMessage = 'Error: The DAO group has only 0.0 ETH. The amount in the request is greater than the balance amount';

    const requestBody = {
      "type": TransactionType.TRANSFER_ETH,
      "userId": mockOwnerId,
      "groupId": DaoGroupId,
      "transferTo": mockAddressForTransferEth,
      "amountOfFunds": "0.0003"
    }

    await spec()
      .post(`/proposals/create`)
      .withHeaders('telegramData', JSON.stringify(mockPersonalTelegramData))
      .withJson(requestBody)
      .expectStatus(500)
      .expectBodyContains(expectedErrorMessage)
  });

  it('try to create contract interaction proposal, but DAO balance is zero', async () => {

    const requestBody = {
      "type": TransactionType.CONTRACT,
      "userId": mockOwnerId,
      "groupId": DaoGroupId,
      "transferTo": mockAddressForContract,
      "amountOfFunds": "0.0003",
      "tokenSymbol": "ETH"
    }

    const expectedErrorMessage = 'Error: The DAO group has only 0.0 ETH. The amount in the request is greater than the balance amount';

    await spec()
      .post(`/proposals/create`)
      .withHeaders('telegramData', JSON.stringify(mockPersonalTelegramData))
      .withJson(requestBody)
      .expectStatus(500)
      .expectBodyContains(expectedErrorMessage)
  });

  
  it('get all created proposals, should be 2', async () => {
    
    // const expectedSchema = validSchemaGetProposals
    
    await spec()
    .get(`/proposals/?pageNumber=1&groupId=${DaoGroupId}&status=voting`)
    .withHeaders('telegramData', JSON.stringify(mockPersonalTelegramData))
    .expectStatus(200)
    // .expectJsonSchema(expectedSchema)
    .retry(3);
  });

  it('try to get non-exist proposal by it id', async () => {

    const nonExistProposal = 999999;

    await spec()
      .get(`/proposals/${nonExistProposal}`)
      .withHeaders('telegramData', JSON.stringify(mockPersonalTelegramData))
      .expectStatus(500)
      .retry(3);
    });

  it('get particular created proposal by it id', async () => {

    await spec()
      .get(`/proposals/${proposalId}`)
      .withHeaders('telegramData', JSON.stringify(mockPersonalTelegramData))
      .expectStatus(200)
      .retry(3);
    });

  it('try to vote for non-exist proposal', async () => {

    const expectedResponse = {
      "statusCode": 500,
      "message": "Error: Proposal not found"
    };

    const nonExistProposal = 999999;

    await spec()
      .put(`/proposals/vote?proposalId=${nonExistProposal}`)
      .withHeaders('telegramData', JSON.stringify(mockPersonalTelegramData))
      .expectJson(expectedResponse)
      .expectStatus(500);
  }); 

  it('vote for proposal', async () => {

    console.log('APPROVE VOTE FOR PROPOSAL TRANSACTION')
    await spec()
      .put(`/proposals/vote?proposalId=${proposalId}`)
      .withHeaders('telegramData', JSON.stringify(mockPersonalTelegramData))
      .expectStatus(200);
  });
  
  it('execute proposal id, but zero DAO balance', async () => {

    const expectedErrorMessage = 'execution failed. See transaction details here:';

    console.log('APPROVE PROPOSAL EXECUTING');
    await spec()
      .put(`/proposals/execute?proposalId=${proposalId}`)
      .withHeaders('telegramData', JSON.stringify(mockPersonalTelegramData))
      .expectStatus(500)
      .expectBodyContains(expectedErrorMessage);
      // .retry(3);
  })
});