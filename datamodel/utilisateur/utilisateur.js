module.exports = class utilisateur {
    constructor(email,challenge,age,pseudo,id=0) {
        this.email = email
        this.challenge = challenge
        this.age = age
        this.pseudo = pseudo
        this.id = id
    }
}