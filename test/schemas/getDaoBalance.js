const validSchemaGetDaoBalance = {
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "balance": {"type": "string"},
      "tokenSymbol": {"type": "string"},
  },
  "required": ["balance", "tokenSymbol"]
}};
module.exports = { validSchemaGetDaoBalance }
