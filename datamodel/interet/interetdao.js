const BaseDAO = require('../basedao')

module.exports = class interet extends BaseDAO {
    constructor(db) {
        super(db,"interet")
    }
    insertinteret(interet) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO interet(idutilisateur,idactivite) VALUES($1,$2)",
                [interet.idutilisateur,interet.idactivite])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
        // Exemple à modifier pour récupérer le dernier ID généré avec res.rows[0].id
    }
    getAllinteret() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM interet ORDER BY id")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    updateinteret(interet) {
        return new Promise((resolve, reject) =>
            this.db.query("UPDATE interet SET idutilisateur=$2,idactivite=$3 WHERE id=$1",
                [interet.id,interet.idutilisateur,interet.idactivite])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    createinteret() {
        return new Promise((resolve, reject) =>
            this.db.query(`CREATE TABLE ${this.tablename}`+
                "(id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY," +
                "idutilisateur INT,"+
                "idactivite INT,"+
                "FOREIGN KEY (idutilisateur) REFERENCES utilisateur(id),"+
                "FOREIGN KEY (idactivite) REFERENCES activite(id))"
            )
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
}