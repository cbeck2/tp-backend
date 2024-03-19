module.exports = (app, svc,svl, jwt) => {
    app.get("/utilisateur", async (req, res) => {
        res.json(await svc.dao.getAllutilisateur())
    })

    app.get("/utilisateur/:id", async (req, res) => {
        try {
            const utilisateur = await svc.dao.getById(req.params.id)
            if (utilisateur === undefined) {
                return res.status(404).end()
            }
            return res.json(utilisateur)
        } catch (e) { res.status(400).end() }
    })

    app.post("/utilisateur", (req, res) => {
        const utilisateur = req.body
        if((utilisateur.id === undefined) || (utilisateur.id == null) || (!svc.isValideutilisateur(utilisateur))) {//crying alone jurrivh
            return res.status(400).end()
        }
        svc.dao.insertutilisateur(utilisateur)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.post("/utilisateur/authentification", (req, res, jwt) => {
        console.log(req.body)
        const {email, mdp} = req.body
        if ((email === undefined) || (mdp === undefined)) {
            res.status(400).end()
            return
        }
        svl.validemdp(email, mdp)
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

    app.delete("/utilisateur/:id", async (req, res) => {
        const utilisateur = await svc.dao.getById(req.params.id)
        if (utilisateur === undefined) {
            return res.status(404).end()
        }
        svc.dao.delete(req.params.id)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.put("/utilisateur", async (req, res) => {
        const utilisateur= req.body
        console.log(utilisateur)
        if ((!svc.isValideutilisateur(utilisateur)))
        {
            return res.status(400).end()
        }
        if (await svc.dao.getById(utilisateur.id) === undefined) {
            return res.status(404).end()
        }
        svc.dao.updateutilisateur(utilisateur)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}
