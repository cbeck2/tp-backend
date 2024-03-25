const utilisateur = require('./utilisateur')

module.exports = (serviceutilisateur) => {
    return new Promise(async (resolve, reject) => {
        try {
            await serviceutilisateur.dao.createutilisateur()
            // autres CREATE TABLE...
            for (let i = 0; i < 5; i++) {
                await serviceutilisateur.dao.insertutilisateur(new utilisateur
                    (
                        "melanoob@gmail.com"+i
                        ,i+20
                        ,"yolooooooy"+i*2
                        ,"melanoob"+i*3
                        ,"https://i.redd.it/cxrn0h5ksd131.jpg"+i*4)
                )
            }
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
            } else {
                reject(e)
            }
            return
        }
    })
}