const ExempleDAO = require("../datamodel/interet/interetdao")

module.exports = class Serviceinteret {
    constructor(db) {
        this.dao = new ExempleDAO(db)
    }
    isValideinteret(interet) {
        if (parseInt(interet.idutilisateur)===null) {
            return false
        }
        if (parseInt(interet.idactivite)===null) {
            return false
        }
        return true
    }
}