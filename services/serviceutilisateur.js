const UserDAO = require("../datamodel/utilisateur/utilisateurdao");
module.exports = class Serviceutilisateur {
    constructor(db) {
        this.dao = new UserDAO(db)
    }
    isValideutilisateur(utilisateur) {
        utilisateur.email = utilisateur.email.trim()
        if (utilisateur.email === "") {
            return true
        }
        if (parseInt(utilisateur.age)===null) {
            return false
        }
        utilisateur.mdp = utilisateur.mdp.trim()
        if (utilisateur.mdp === "") {
            return false
        }
        utilisateur.pseudo = utilisateur.pseudo.trim()
        if (utilisateur.pseudo === "") {
            return false
        }
        utilisateur.pdp = utilisateur.pdp.trim()
        if (utilisateur.pdp === "") {
            return false
        }
        if (parseInt(utilisateur.id)===null) {
            return false
        }
        return true
    }

}