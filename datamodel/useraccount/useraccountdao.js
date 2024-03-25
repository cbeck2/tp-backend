const BaseDAO = require('./useraccount')

module.exports = class UserAccountDAO extends BaseDAO {
    constructor(db) {
        super(db, "useraccount")
    }

    insert(useraccount) {
        return this.db.query("INSERT INTO useraccount(login,challenge) VALUES ($1,$2,$3)",
            [useraccount.login, useraccount.challenge])
    }

    getByLogin(login) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM useraccount WHERE login=$1", [ login ])
                .then(res => resolve(res.rows[0]) )
                .catch(e => reject(e)))
    }

    createuseraccount() {
        return new Promise((resolve, reject) =>
            this.db.query(`CREATE TABLE useraccount${this.tablename}`
                +"(id SERIAL PRIMARY KEY," +
                "login TEXT NOT NULL," +
                "challenge TEXT NOT NULL)")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
}