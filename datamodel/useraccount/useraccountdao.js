const BaseDAO = require('../basedao')

module.exports = class useraccountDAO extends BaseDAO {
    constructor(db) {
        super(db,"useraccount")
    }
    insertuseraccount(useraccount) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO useraccount(login,mdp) VALUES($1,$2)",
                [useraccount.login, useraccount.mdp])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
        // Exemple à modifier pour récupérer le dernier ID généré avec res.rows[0].id
    }
    getAlluseraccount() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM useraccount ORDER BY id")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    updateuseraccount(useraccount) {
        return new Promise((resolve, reject) =>
            this.db.query("UPDATE useraccount SET login=$2,mdp=$4 WHERE id=$1",
                [useraccount.id, useraccount.login])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    createuseraccount() {
        return new Promise((resolve, reject) =>
            this.db.query(`CREATE TABLE ${this.tablename}` +
                "(id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY," +
                "login TEXT," +
                "mdp TEXT)")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    getByLogin(login) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM useraccount WHERE login=$1", [ login ])
                .then(res => resolve(res.rows[0]) )
                .catch(e => reject(e)))
    }
}