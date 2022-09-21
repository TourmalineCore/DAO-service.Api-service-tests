const validSchemaGetGroups = {
  "type": "object",
  "properties": {    
    "pending": {
      "type": "array",
      "items": [{
        "type": "object",
        "properties": {
          "id": {"type": "integer"},
          "name": {"type": "string"},
          "usersCount": {"type": "integer"},
          "createdAt": {"type": "string"},
          "userPreviews": {
            "type": "array",
            "items": [
              {"type": "object"},
              {"type": "object"}
            ]
          }
        },
      }]
    },
    "daos": {
    "type": "array",
    "items": [{
      "type": "object",
      "properties": {
        "id": {"type": "integer"},
        "name": {"type": "string"},
        "usersCount": {"type": "integer"},
        "createdAt": {"type": "string"},
        "userPreviews": {
          "type": "array",
          "items": [
            {"type": "object"},
            {"type": "object"}
          ]
        }
      },
    }]},
  },
  "required": [
    "pending",
    "daos"
  ]
}
module.exports = { validSchemaGetGroups }
