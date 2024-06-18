const message = require('./message/message')
const interet = require('./interet/interet')
const ami = require('./ami/ami')
const activite = require('./activite/activite')

module.exports = (serviceutilisateur,servicemessage,serviceinteret,serviceami,serviceactivite) => {
    return new Promise(async (resolve, reject) => {
        try {
            await serviceutilisateur.dao.db.query("CREATE TABLE utilisateur("+
                "id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,"+
                "email TEXT NOT NULL,"+
                "challenge TEXT NOT NULL,"+
                "date DATE NOT NULL,"+
                "pseudo TEXT NOT NULL)")

            await servicemessage.dao.db.query("CREATE TABLE message("+
                "id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,"+
                "idauteur INT NOT NULL,"+
                "idrecepteur INT NOT NULL,"+
                "message TEXT,"+
                "attachement TEXT,"+
                "date DATE NOT NULL,"+
                "FOREIGN KEY (idauteur) REFERENCES utilisateur(id),"+
                "FOREIGN KEY (idrecepteur) REFERENCES utilisateur(id))")

            await serviceami.dao.db.query("CREATE TABLE ami("+
                "id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,"+
                "idutilisateur1 INT NOT NULL,"+
                "idutilisateur2 INT NOT NULL,"+
                "FOREIGN KEY (idutilisateur1) REFERENCES utilisateur(id),"+
                "FOREIGN KEY (idutilisateur2) REFERENCES utilisateur(id))")

            await serviceactivite.dao.db.query("CREATE TABLE activite("+
                "id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,"+
                "nom TEXT NOT NULL)")

            await serviceinteret.dao.db.query("CREATE TABLE interet("+
                "id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,"+
                "idutilisateur INT NOT NULL,"+
                "idactivite INT NOT NULL,"+
                "FOREIGN KEY (idutilisateur) REFERENCES utilisateur(id),"+
                "FOREIGN KEY (idactivite) REFERENCES activite(id))")

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
                    ,"2023-10-2"+i
                    ,"melanoob"+i
                )
            await servicemessage.dao.insertmessage(new message
                (
                    i+0
                    ,i+0
                    ,"yoloooooo"+i
                    ,null
                    ,new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)))
                )
            await serviceami.dao.insertami(new ami
                (i+0,i+0)
                )
            await serviceactivite.dao.insertactivite(new activite
                ("coder"+i)
            )
            await serviceinteret.dao.insertinteret(new interet
                (i+0,i+0)
            )
        }
    })
}
