const ExempleDAO = require("../datamodel/activite/activitedao")
//todo ajouter de nouvelle validation
module.exports = class Serviceactivite {
    constructor(db) {
        this.dao = new ExempleDAO(db)
    }
    isValideactivite(activite) {
        activite.nom = activite.nom.trim()
        if (activite.nom === "") {
            return false
        }
        return true
    }
}