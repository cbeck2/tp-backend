const BaseDAO = require('../basedao')

module.exports = class ami extends BaseDAO {
    constructor(db) {
        super(db,"ami")
    }
    async insertami(ami) {
        ami.idutilisateur1 = await this.getByLogin(ami.idutilisateur1)
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO ami(idutilisateur1,idutilisateur2) VALUES($1,$2)",
                [ami.idutilisateur1.id, ami.idutilisateur2])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    getami(id) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT /*idutilisateur1 AND idutilisateur2*/* FROM ${this.tablename} WHERE idutilisateur1=$1 OR idutilisateur2=$1`,
                [id])

                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    /*updateami(ami) {
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
                "idutilisateur1 INT NOT NULL,"+
                "idutilisateur2 INT NOT NULL,"+
                "FOREIGN KEY (idutilisateur1) REFERENCES utilisateur(id),"+
                "FOREIGN KEY (idutilisateur2) REFERENCES utilisateur(id))"
            )
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }*/
    getByLogin(pseudo) {
        return new Promise(async (resolve, reject) =>
            await this.db.query(`SELECT id FROM utilisateur` + " WHERE pseudo=$1", [pseudo])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }
}