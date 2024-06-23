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
            return "email"
        }
        if (Date.parse(utilisateur.datenaissance)===null) {
            return "datenaissance"
        }
        utilisateur.password = utilisateur.password.trim()
        if (utilisateur.password === "") {
            return "password"
        }
        utilisateur.pseudo = utilisateur.pseudo.trim()
        if (utilisateur.pseudo === "") {
            return "pseudo"
        }
        return false
    }

    hashPassword(password) {
        return bcrypt.hashSync(password, 11)  // 11(premier) : cost factor -> + élevé = hash + sûr & + long
    }

    async validatePassword(email, password) {
        const user = await this.dao.getByEmail(email.trim())
        return this.comparePassword(password, user.challenge)
    }

    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash)
    }

    insert(email, password, age, pseudo) {
        return this.dao.insertutilisateur(new utilisateur(email, this.hashPassword(password), age, pseudo))
    }
}