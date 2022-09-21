const { faker } = require('@faker-js/faker')

function generateGroupId() {
  const generatedGroupId = -faker.random.numeric(9);
  return generatedGroupId
};
module.exports = { generateGroupId }