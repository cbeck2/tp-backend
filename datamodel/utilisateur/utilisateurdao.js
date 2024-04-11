const BaseDAO = require('../basedao')
const utilisateur = require("./utilisateur");

module.exports = class utilisateur extends BaseDAO {
    constructor(db) {
        super(db,"utilisateur")
    }

    insertutilisateur(utilisateur) {
        return new Promise((resolve, reject) =>
            this.db.query(`INSERT INTO ${this.tablename}`+"(email,challenge,age,pseudo) VALUES($1,$2,$3,$4)", [utilisateur.email,utilisateur.challenge, utilisateur.age, utilisateur.pseudo])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    getAllutilisateur() {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT * FROM ${this.tablename}`+" ORDER BY id")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    updateutilisateur(utilisateur) {
        return new Promise((resolve, reject) =>
            this.db.query(`UPDATE ${this.tablename}`+" SET email=$2,age=$3,pseudo=$4 WHERE id=$1",
                [utilisateur.id, utilisateur.email, utilisateur.age, utilisateur.pseudo])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    getByLogin(login) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT * FROM ${this.tablename}`+" WHERE email=$1", [login])
                .then(res => resolve(res.rows[0]) )
                .catch(e => reject(e)))
    }
}