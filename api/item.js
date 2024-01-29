module.exports = (app, svc) => {
    app.get("/item", async (req, res) => {
        res.json(await svc.dao.getAllitem())
    })
    app.get("/item/:id", async (req, res) => {
        try {
            const item = await svc.dao.getById(req.params.id)
            if (item === undefined) {
                return res.status(404).end()
            }
            return res.json(item)
        } catch (e) { res.status(400).end() }
    })
    app.post("/item", (req, res) => {
        const item = req.body
        if (!svc.isValiditem(item))  {//crying alone jurrivh
            return res.status(400).end()
        }
        svc.dao.insertitem(item)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.delete("/item/:id", async (req, res) => {
        const item = await svc.dao.getById(req.params.id)
        if (item === undefined) {
            return res.status(404).end()
        }
        svc.dao.delete(req.params.id)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.put("/item", async (req, res) => {
        console.log(req.body)
        const item= req.body
        if ((item.id === undefined) || (item.id == null) || (!svc.isValiditem(item))) {
            return res.status(400).end()
        }
        if (await svc.dao.getById(item.id) === undefined) {
            return res.status(404).end()
        }
        svc.dao.updateitem(item)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}
