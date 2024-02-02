const BaseDAO = require('../basedao')

module.exports = class ami extends BaseDAO {
    constructor(db) {
        super(db,"ami")
    }
    insertami(ami) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO ami(idutilisateur1,idutilisateur2) VALUES($1,$2)",
                [ami.idutilisateur1,ami.idutilisateur2])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
        // Exemple à modifier pour récupérer le dernier ID généré avec res.rows[0].id
    }
    getAllami() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM ami ORDER BY id")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    updateami(ami) {
        return new Promise((resolve, reject) =>
            this.db.query("UPDATE ami SET idutilisateur1=$2,idutilisateur2=$3 WHERE id=$1",
                [ami.id,ami.idutilisateur1,ami.idutilisateur2])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    createami() {
        return new Promise((resolve, reject) =>
            this.db.query(`CREATE TABLE ${this.tablename}`+
                "(id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY," +
                "idutilisateur1 INT,"+
                "idutilisateur2 INT,"+
                "FOREIGN KEY (idutilisateur1) REFERENCES utilisateur(id),"+
                "FOREIGN KEY (idutilisateur2) REFERENCES utilisateur(id))"
            )
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
}