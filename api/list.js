module.exports = (app, svc) => {
    app.get("/list", async (req, res) => {
        res.json(await svc.dao.getAlllist())
    })
    app.get("/list/:id", async (req, res) => {
        try {
            const list = await svc.dao.getById(req.params.id)
            if (list === undefined) {
                return res.status(404).end()
            }
            return res.json(list)
        } catch (e) { res.status(400).end() }
    })
    app.post("/list", (req, res) => {
        const list = req.body
        if (!svc.isValidlist(list))  {
            return res.status(400).end()
        }
        svc.dao.insertlist(list)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.delete("/list/:id", async (req, res) => {
        const list = await svc.dao.getById(req.params.id)
        if (list === undefined) {
            return res.status(404).end()
        }
        svc.dao.delete(req.params.id)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.put("/list", async (req, res) => {
        const list = req.body
        if ((list.id === undefined) || (list.id == null) || (!svc.isValidlist(list))) {
            return res.status(400).end()
        }
        if (await svc.dao.getById(list.id) === undefined) {
            return res.status(404).end()
        }
        svc.dao.updatelist(list)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}
