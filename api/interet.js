module.exports = (app, svc) => {
    app.get("/interet", async (req, res) => {
        res.json(await svc.dao.getAllinteret())
    })
    app.get("/interet/:id", async (req, res) => {
        try {
            const interet = await svc.dao.getById(req.params.id)
            if (interet === undefined) {
                return res.status(404).end()
            }
            return res.json(interet)
        } catch (e) { res.status(400).end() }
    })
    app.post("/interet", (req, res) => {
        const interet = req.body
        if (!svc.isValideinteret(interet))  {//crying alone jurrivh
            return res.status(400).end()
        }
        svc.dao.insertinteret(interet)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.delete("/interet/:id", async (req, res) => {
        const interet = await svc.dao.getById(req.params.id)
        if (interet === undefined) {
            return res.status(404).end()
        }
        svc.dao.delete(req.params.id)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}
