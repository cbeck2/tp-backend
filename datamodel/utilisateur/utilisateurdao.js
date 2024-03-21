const BaseDAO = require('../basedao')
const UserAccount = require("./utilisateur");

module.exports = class utilisateurDAO extends BaseDAO {
    constructor(db) {
        super(db,"utilisateur")
    }
    insertutilisateur(utilisateur) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO utilisateur(email,age,mdp,pseudo,pdp) VALUES($1,$2,$3,$4,$5)",
                [utilisateur.email, utilisateur.age, utilisateur.this.hashmdp(mdp), utilisateur.pseudo, utilisateur.pdp])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
        // Exemple à modifier pour récupérer le dernier ID généré avec res.rows[0].id
    }
    getAllutilisateur() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM utilisateur ORDER BY id")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    updateutilisateur(utilisateur) {
        return new Promise((resolve, reject) =>
            this.db.query("UPDATE utilisateur SET email=$2,age=$3,mdp=$4,pseudo=$5,pdp=$6 WHERE id=$1",
                [utilisateur.id, utilisateur.email, utilisateur.age, utilisateur.this.hashmdp(mdp), utilisateur.pseudo, utilisateur.pdp])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    createutilisateur() {
        return new Promise((resolve, reject) =>
            this.db.query(`CREATE TABLE ${this.tablename}` +
                "(id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY," +
                "email TEXT," +
                "age NUMERIC," +
                "mdp TEXT," +
                "pseudo TEXT," +
                "pdp TEXT)")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    getByLogin(login) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM utilisateur WHERE email=$1", [ login ])
                .then(res => resolve(res.rows[0]) )
                .catch(e => reject(e)))
    }
}