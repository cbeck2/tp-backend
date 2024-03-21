const utilisateur = require('./utilisateur')

module.exports = (serviceutilisateur) => {
    return new Promise(async (resolve, reject) => {
        try {
            await serviceutilisateur.dao.createutilisateur()
            for (let i = 0; i < 5; i++) {
                await serviceutilisateur.dao.insertutilisateur(new utilisateur
                    ("melanoob@gmail.com"+i
                    ,i+20
                    ,"yolooooooy"+i*2
                    ,"melanoob"+i*3
                    ,"https://i.redd.it/cxrn0h5ksd131.jpg"+i*4)
                )
            }
        } catch (e) {
            if (e.code === "42P07") {
                resolve()
            } else {
                reject(e)
            }
            return
        }
    })
}