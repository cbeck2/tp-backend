module.exports = (app, svc) => {
    app.get("/ami", async (req, res) => {
        res.json(await svc.dao.getAllami())
    })
    app.get("/ami/:id", async (req, res) => {
        try {
            const ami = await svc.dao.getById(req.params.id)
            if (ami === undefined) {
                return res.status(404).end()
            }
            return res.json(ami)
        } catch (e) { res.status(400).end() }
    })
    app.post("/ami", (req, res) => {
        const ami = req.body
        if (!svc.isValideami(ami))  {//crying alone jurrivh
            return res.status(400).end()
        }
        svc.dao.insertami(ami)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.delete("/ami/:id", async (req, res) => {
        const ami = await svc.dao.getById(req.params.id)
        if (ami === undefined) {
            return res.status(404).end()
        }
        svc.dao.delete(req.params.id)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.put("/ami", async (req, res) => {
        console.log(req.body)
        const ami= req.body
        if ((ami.id === undefined) || (ami.id == null) || (!svc.isValideami(ami))) {
            return res.status(400).end()
        }
        if (await svc.dao.getById(ami.id) === undefined) {
            return res.status(404).end()
        }
        svc.dao.updateami(ami)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}
