module.exports = class utilisateur {
    constructor(email,challenge,datenaissance,pseudo,id=0) {
        this.email = email
        this.challenge = challenge
        this.datenaissance = datenaissance
        this.pseudo = pseudo
        this.id = id
    }
}