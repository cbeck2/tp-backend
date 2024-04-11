const UserDAO = require("../datamodel/utilisateur/utilisateurdao");
const bcrypt = require("bcrypt");
const utilisateur = require("../datamodel/utilisateur/utilisateur");
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

    hashPassword(password) {
        return bcrypt.hashSync(password, 11)  // 11(premier) : cost factor -> + élevé = hash + sûr & + long
    }

    async validatePassword(email, password) {
        const user = await this.dao.getByLogin(email.trim())
        return this.comparePassword(password, user.challenge)
    }

    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash)
    }

    insert(email, password, age, pseudo) {
        return this.dao.insertutilisateur(new utilisateur(email, this.hashPassword(password), age, pseudo))
    }
}