const ExempleDAO = require("../datamodel/message/messagedao")

module.exports = class Servicemessage {
    constructor(db) {
        this.dao = new ExempleDAO(db)
    }
    isValidemessage(message) {
        if (parseInt(message.idauteur)===null) {
            return false
        }
        if (parseInt(message.idrecepteur)===null) {
            return false
        }
        message.message = message.message.trim()
        if (message.message === "") {
            return false
        }
        message.attachement = message.attachement.trim()
        if (message.attachement === "") {
            return false
        }
        if (message.date != null) {
            if (message.date instanceof String) {
                message.date = new Date(message.date)
                console.log(message.date)
            }
            if (message.date >= new Date()) {
                return false
            }
        }
        if (parseInt(message.id)===null) {
            return false
        }
        return true
    }
}