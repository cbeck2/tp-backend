const ExempleDAO = require("../datamodel/message/messagedao")

module.exports = class Servicemessage {
    constructor(db) {
        this.dao = new ExempleDAO(db)
    }
    isValidemessage(message) {
        message.message = message.message.trim()
        if (message.message === "") {
            return false
        }
        return true
    }
}