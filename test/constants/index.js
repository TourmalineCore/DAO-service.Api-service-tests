const { generateGroupId } = require('../helpers/apiHelper');
const { faker } = require('@faker-js/faker')

const mockGroupId = generateGroupId();


// You need to change this constants on your own data for stable work of tests
// ------------------------------------------------------------------------
const mockPersonalTelegramData = {"query_id":"AAE3SfY-AAAAADdJ9j68OskO","user":"{\"id\":1056327991,\"first_name\":\"Vladislav\",\"last_name\":\"Yusupov\",\"username\":\"iamvladislav\",\"language_code\":\"en\"}","auth_date":"1661508997","hash":"e25ab403d0bc63ab8147c1254afbf4d8068bd0abe470a1afc0a57321ca055be6"};                                          
const mockAssistantTelegramData = {"query_id":"AAE3SfY-AAAAADdJ9j4QITp1","user":"{\"id\":1056327991,\"first_name\":\"Vladislav\",\"last_name\":\"Yusupov\",\"username\":\"iamvladislav\",\"language_code\":\"en\"}","auth_date":"1658988403","hash":"6f19e07c5fa68c540d55403bc475df4358ad04a8d532e1913260e9228241d5b3"};

const mockOwnerId = 1056327991; 

const mockOwnerAddress = "0xe5120849915F24E665D90c4578913214F25bB46A";
const mockSomeAddress = "0x497F3cC562D500371dc093B5086c73Fa7ae57C9c";
const mockParticipantsList = [
  "0x02cC2c7Fec33591ac1C0b605d34bE504Db632280",
  // OPTIONAL: You can add here some new addressess if you want
]
// ------------------------------------------------------------------------


const mockData = {
  "telegramPersonalData": mockPersonalTelegramData,
  "telegramAssistantData": mockAssistantTelegramData,
  "groupId": mockGroupId,
  "ownerId": mockOwnerId,
  "ownerAddress": mockOwnerAddress,
  "participantsList": [
    ...mockParticipantsList
  ],
}

const proposalData = {
  "addressForAdd": mockSomeAddress,
  "addressForRemove": mockParticipantsList[faker.datatype.number({ min: 0, max: (mockParticipantsList.length - 1) })],
  "addressForTransferEth":mockSomeAddress,
  "addressForContract":mockSomeAddress,
}

const personalData = {
  "id": 1056327991,
  "firstName": "Vladislav",
  "lastName": "Yusupov",
  "username": "@iamvladislav"
}

const assistantData= {
  "id": mockOwnerId,
  "firstName": "Ilya",
  "lastName": "Sapronov",
  "username": "@Iliandrik"
}

const TransactionType = {
  "ADD": "add participant",
  "REMOVE": "remove participant",
  "TRANSFER_ETH": "transfer ethers",
  "CONTRACT": "contract interaction",
}

module.exports = { mockData, proposalData, personalData, assistantData, TransactionType}