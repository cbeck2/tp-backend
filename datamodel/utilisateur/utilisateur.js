module.exports = class utilisateur {
    constructor(email,age,mdp,pseudo,pdp,id=0) {
        this.email = email
        this.age = age
        this.mdp = mdp
        this.pseudo = pseudo
        this.pdp = pdp
        this.id = id
    }
}