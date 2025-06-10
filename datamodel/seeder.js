const message = require('./message/message')
const ami = require('./ami/ami')

module.exports = (serviceutilisateur,servicemessage,serviceami/*,serviceinteret,serviceactivite*/) => {
    return new Promise(async (resolve, reject) => {
        try {
            await serviceutilisateur.dao.db.query(
                "CREATE TABLE utilisateur("+
                    "id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,"+
                    "email TEXT NOT NULL UNIQUE,"+
                    "challenge TEXT NOT NULL,"+
                    "date DATE NOT NULL,"+
                    "pseudo TEXT NOT NULL UNIQUE " +
                ")"
            )

            await servicemessage.dao.db.query(
                "CREATE TABLE message("+
                    "id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,"+
                    "idauteur INT NOT NULL,"+
                    "idrecepteur INT NOT NULL,"+
                    "pseudoauteur TEXT NOT NULL,"+
                    "pseudorecepteur TEXT NOT NULL,"+
                    "message TEXT,"+
                    "FOREIGN KEY (idauteur) REFERENCES utilisateur(id),"+
                    "FOREIGN KEY (idrecepteur) REFERENCES utilisateur(id)," +
                    "FOREIGN KEY (pseudoauteur) REFERENCES utilisateur(pseudo),"+
                    "FOREIGN KEY (pseudorecepteur) REFERENCES utilisateur(pseudo)" +
                ")"
            )

            await serviceami.dao.db.query("" +
                "CREATE TABLE ami("+
                    "id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,"+
                    "idutilisateur1 INT NOT NULL,"+
                    "idutilisateur2 INT NOT NULL,"+
                    "pseudoutilisateur1 TEXT NOT NULL,"+
                    "pseudoutilisateur2 TEXT NOT NULL,"+
                    "FOREIGN KEY (idutilisateur1) REFERENCES utilisateur(id),"+
                    "FOREIGN KEY (idutilisateur2) REFERENCES utilisateur(id)," +
                    "FOREIGN KEY (pseudoutilisateur1) REFERENCES utilisateur(pseudo),"+
                    "FOREIGN KEY (pseudoutilisateur2) REFERENCES utilisateur(pseudo)" +
                ")"
            )

            /*await serviceactivite.dao.db.query("CREATE TABLE activite("+
                "id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,"+
                "nom TEXT NOT NULL)")

            await serviceinteret.dao.db.query("CREATE TABLE interet("+
                "id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,"+
                "idutilisateur INT NOT NULL,"+
                "idactivite INT NOT NULL,"+
                "FOREIGN KEY (idutilisateur) REFERENCES utilisateur(id),"+
                "FOREIGN KEY (idactivite) REFERENCES activite(id))")*/

        } catch (e) {
            if (e.code === "42P07") {
                resolve()
            } else {
                reject(e)
            }
            return
        }
        for(let i=1;i<5;i++){
            await serviceutilisateur.insert(
                    "user"+i+"@example.com"
                    ,"trololost"
                    ,"2000-10-2"+i
                    ,"melanoob"+i
                )
            
            await servicemessage.dao.insertmessage(new message
                (
                    i
                    ,i
                    ,"yoloooooo"+i
                    ,"melanoob"+i
                    ,"melanoob"+i
                )
            )
            await serviceami.dao.insernewtami(new ami
                (
                    i,i,"melanoob"+i,"melanoob"+i)
                )
            /*await serviceactivite.dao.insertactivite(new activite
                ("coder"+i)
            )
            await serviceinteret.dao.insertinteret(new interet
                (i+0,i+0)
            )*/
        }
    })
}
