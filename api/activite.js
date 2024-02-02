module.exports = (app, svc) => {
    app.get("/activite", async (req, res) => {
        res.json(await svc.dao.getAllactivite())
    })
    app.get("/activite/:id", async (req, res) => {
        try {
            const activite = await svc.dao.getById(req.params.id)
            if (activite === undefined) {
                return res.status(404).end()
            }
            return res.json(activite)
        } catch (e) { res.status(400).end() }
    })
    app.post("/activite", (req, res) => {
        const activite = req.body
        if (!svc.isValideactivite(activite))  {//crying alone jurrivh
            return res.status(400).end()
        }
        svc.dao.insertactivite(activite)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.delete("/activite/:id", async (req, res) => {
        const activite = await svc.dao.getById(req.params.id)
        if (activite === undefined) {
            return res.status(404).end()
        }
        svc.dao.delete(req.params.id)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.put("/activite", async (req, res) => {
        console.log(req.body)
        const activite= req.body
        if ((activite.id === undefined) || (activite.id == null) || (!svc.isValideactivite(activite))) {
            return res.status(400).end()
        }
        if (await svc.dao.getById(activite.id) === undefined) {
            return res.status(404).end()
        }
        svc.dao.updateactivite(activite)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}
