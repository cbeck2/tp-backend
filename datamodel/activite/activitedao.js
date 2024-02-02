const BaseDAO = require('../basedao')

module.exports = class activite extends BaseDAO {
    constructor(db) {
        super(db,"activite")
    }
    insertactivite(activite) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO activite(nom) VALUES($1)",
                [activite.nom])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
        // Exemple à modifier pour récupérer le dernier ID généré avec res.rows[0].id
    }
    getAllactivite() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM activite ORDER BY id")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    updateactivite(activite) {
        return new Promise((resolve, reject) =>
            this.db.query("UPDATE activite SET nom=$2 WHERE id=$1",
                [activite.id,activite.nom])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    createactivite() {
        return new Promise((resolve, reject) =>
            this.db.query(`CREATE TABLE ${this.tablename}`+
                "(id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY," +
                "nom TEXT)")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
}