const BaseDAO = require('../basedao')
const message = require('../message/message')

module.exports = class message extends BaseDAO {
    constructor(db) {
        super(db,"message")
    }
    insertmessage(message) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO message(idauteur,idrecepteur,message,pseudoauteur,pseudorecepteur) VALUES($1,$2,$3,$4,$5)",
                [message.idauteur, message.idrecepteur, message.message, message.pseudoauteur, message.pseudorecepteur])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
        // Exemple à modifier pour récupérer le dernier ID généré avec res.rows[0].id
    }
    getAllmessage() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM message ORDER BY id")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    async getmessage(pseudo1, pseudo2) {
        return await new Promise((resolve, reject) =>
            this.db.query(`SELECT pseudoauteur, pseudorecepteur, message FROM message` + " WHERE (pseudoauteur=$1 AND pseudorecepteur=$2) OR (pseudoauteur=$2 AND pseudorecepteur=$1) ORDER BY id",
                [pseudo1,pseudo2])
                .then(res => resolve(res.rows))
                .catch(e =>  reject(e)))
    }
    async tomessage(message,pseudo){
        let idauteur = await this.getByLogin(pseudo)
        let idrecepteur = await  this.getByLogin(message.pseudo)
        let mes=[idauteur.id,idrecepteur.id,message.message,pseudo,message.pseudo]
        return mes
    }
    getByLogin(pseudo) {
        return new Promise(async (resolve, reject) =>
            await this.db.query(`SELECT id FROM utilisateur` + " WHERE pseudo=$1", [pseudo])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }
    getbyemail(email) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT pseudo FROM utilisateur WHERE email=$1`,
                [email])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
}