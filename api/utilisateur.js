const utilisateur = require("../datamodel/utilisateur/utilisateur");
module.exports = (app, svc, jwt) => {
    app.get("/utilisateur/:id", async (req, res) => {
        try {
            const utilisateur = await svc.dao.getutilisateurbyid(req.params.id)
            if (utilisateur === undefined) {
                return res.status(404).end()
            }
            return res.json(utilisateur)
        } catch (e) { res.status(400).end() }
    })

    app.post("/utilisateur", (req, res) => {
        const utilisateur = req.body
        if(!svc.isValideutilisateur(utilisateur)===false) {//crying alone jurrivh
            console.log(svc.isValideutilisateur(utilisateur))
            return res.status(400).end()
        }
        svc.insert(utilisateur.email,utilisateur.password,utilisateur.datenaissance,utilisateur.pseudo)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.put("/utilisateur",   (req, res) => {
        const utilisateur= req.body
        if ((!svc.isValideutilisateur(utilisateur)))
        {
            return res.status(400).end()
        }
        if (svc.dao.getById(utilisateur.id) === undefined) {
            return res.status(404).end()
        }
        svc.dao.updateutilisateur(utilisateur)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.post('/authentification', async (req, res) => {
        const { email, mdp } = req.body
        if ((email === undefined) || (mdp === undefined)) {
            res.status(400).end()
            return
        }
        svc.validatePassword(email, mdp)
            .then(authenticated => {
                if (!authenticated) {
                    res.status(401).end()
                    return
                }
                res.json({'token': jwt.generateJWT(email)})
            })
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}
