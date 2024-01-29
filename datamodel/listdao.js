const BaseDAO = require('./basedao')

module.exports = class listDAO extends BaseDAO {
    constructor(db) {
        super(db,"list")
    }
    insertlist(list) {
        return new Promise((resolve, reject) =>
        this.db.query("INSERT INTO list(id,shop,date,archived) VALUES ($1,$2,$3,$4)",
            [list.id,list.shop, list.date, list.archived])
            .then(res => resolve(res.rows))
            .catch(e => reject(e)))
        // Exemple à modifier pour récupérer le dernier ID généré avec res.rows[0].id
    }
    getAlllist() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM list ORDER BY shop,date")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    updatelist(list) {
    return new Promise((resolve, reject) =>
            this.db.query("UPDATE list SET shop=$2,date=$3,archived=$4 WHERE id=$1",
                [list.id, list.shop, list.date, list.archived])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    createlist() {
        return new Promise((resolve, reject) =>
            this.db.query("CREATE TABLE list" +
                "(id INT PRIMARY KEY NOT NULL," +
                "shop TEXT," +
                "date DATE," +
                "archived BOOLEAN)")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
}