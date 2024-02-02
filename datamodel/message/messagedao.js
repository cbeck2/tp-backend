const BaseDAO = require('../basedao')

module.exports = class message extends BaseDAO {
    constructor(db) {
        super(db,"message")
    }
    insertmessage(message) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO message(idauteur,idrecepteur,message,attachement,date) VALUES($1,$2,$3,$4,$5)",
                [message.idauteur, message.idrecepteur, message.message, message.attachement, message.date])
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
    updatemessage(message) {
        return new Promise((resolve, reject) =>
            this.db.query("UPDATE message SET message=$2,attachement=$3 WHERE id=$1",
                [message.id,message.message, message.attachement])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    createmessage() {
        return new Promise((resolve, reject) =>
            this.db.query(`CREATE TABLE ${this.tablename}`+
                "(id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY," +
                "idauteur INT," +
                "idrecepteur INT," +
                "message TEXT," +
                "attachement TEXT," +
                "date DATE," +
                "FOREIGN KEY (idauteur) REFERENCES utilisateur(id)," +
                "FOREIGN KEY (idrecepteur) REFERENCES utilisateur(id))")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
}