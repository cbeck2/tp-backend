const ExempleDAO = require("../datamodel/ami/amidao")

module.exports = class Serviceami {
    constructor(db) {
        this.dao = new ExempleDAO(db)
    }
    isValideami(ami) {
        if (parseInt(ami.idutilisateur1)===null) {
            return false
        }
        if (parseInt(ami.idutilisateur2)===null) {
            return false
        }
        return true
    }
}