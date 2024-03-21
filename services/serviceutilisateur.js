const ExempleDAO = require("../datamodel/utilisateur/utilisateurdao")
const bcrypt = require('bcrypt')
const UserAccountDAO = require("../datamodel/utilisateur/utilisateurdao");
const UserAccount = require("../datamodel/utilisateur/utilisateur");

module.exports = class Serviceutilisateur {
    constructor(db) {
        this.dao = new ExempleDAO(db)
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

    hashmdp(mdp) {
        return bcrypt.hashSync(mdp, 10)  // 10 : cost factor -> + élevé = hash + sûr
    }


    comparemdp(mdp, hash) {
        return bcrypt.compareSync(mdp, hash)
    }

    async validemdp(email, mdp) {
        const user = await this.dao.getByLogin(login.trim())
        return this.comparemdp(mdp, mdp)
    }
}