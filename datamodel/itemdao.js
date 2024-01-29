const BaseDAO = require('./basedao')

module.exports = class itemDAO extends BaseDAO {
    constructor(db) {
        super(db,"item")
    }
    insertitem(item) {
        return new Promise((resolve, reject) =>
        this.db.query("INSERT INTO item(id,label,quantity,checked,listid) VALUES ($1,$2,$3,$4,$5)",
            [item.id,item.label, item.quantity, item.checked,item.listid])
            .then(res => resolve(res.rows))
            .catch(e => reject(e)))
    }
    getAllitem() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM item ORDER BY label,quantity")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    getBylist(listid) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT * FROM ${this.tablename} WHERE listid=$1`, [ listid ])
                .then(res => resolve(res.rows[0]) )
                .catch(e => reject(e)))
    }
    updateitem(item) {
        return new Promise((resolve, reject) =>
            this.db.query("UPDATE item SET label=$2,quantity=$3,checked=$4,listid=$5 WHERE id=$1",
                [item.id, item.label, item.quantity, item.checked,item.listid])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    createitem() {
        return new Promise((resolve, reject) =>
            this.db.query("CREATE TABLE item\n" +
                "(\n" +
                "id INT PRIMARY KEY NOT NULL,\n" +
                "label TEXT,\n" +
                "quantity NUMERIC,\n" +
                "checked BOOLEAN,\n" +
                "listid INT\n" +
                ")")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
}