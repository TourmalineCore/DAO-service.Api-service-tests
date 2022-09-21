const validSchemaGetProposals = {
  "type": "object",
  "properties": {
    "groupTitle": {"type": "string"},
    "threshold": {"type": "integer"},
    "proposals": {
      "type": "array",
      "items":[{
        "type": "object",
        "properties": {
          "id": {"type": "integer"},
          "nonce": {"type": "integer"},
          "type": {"type": "string"},
          "confirmations": {"type": "integer"},
          "dateCreated": {"type": "integer"},
          "confirmedByUser": {"type": "boolean"},
          "canBeExecuted": {"type": "boolean"},
          "address": {"type": "string"},
        },
      }],
    },
  },
  "required": ["groupTitle", "threshold", "proposals"],
};
module.exports = { validSchemaGetProposals }
