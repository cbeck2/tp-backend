const bcrypt = require('bcrypt')
const UserAccountDAO = require('../datamodel/utilisateur/utilisateurdao')
const UserAccount = require('../datamodel/utilisateur/utilisateur')

module.exports = class UserAccountService {
    constructor(db) {
        this.dao = new UserAccountDAO(db)
    }
    hashmdp(mdp) {
        return bcrypt.hashSync(mdp, 10)  // 10 : cost factor -> + élevé = hash + sûr
    }

    insert(login, email, mdp) {
        return this.dao.insert(new UserAccount(login, email, this.hashPassword(mdp)))
    }

    comparemdp(mdp, hash) {
        return bcrypt.compareSync(mdp, hash)
    }

    async validemdp(login, mdp) {
        const user = await this.dao.getByLogin(login.trim())
        return this.comparemdp(mdp, user.challenge)
    }
}