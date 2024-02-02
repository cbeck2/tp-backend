module.exports = (app, svc) => {
    app.get("/message", async (req, res) => {
        res.json(await svc.dao.getAllmessage())
    })
    app.get("/message/:id", async (req, res) => {
        try {
            const message = await svc.dao.getById(req.params.id)
            if (message === undefined) {
                return res.status(404).end()
            }
            return res.json(message)
        } catch (e) { res.status(400).end() }
    })
    app.post("/message", (req, res) => {
        const message = req.body
        if (!svc.isValidemessage(message))  {//crying alone jurrivh
            return res.status(400).end()
        }
        svc.dao.insertmessage(message)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.delete("/message/:id", async (req, res) => {
        const message = await svc.dao.getById(req.params.id)
        if (message === undefined) {
            return res.status(404).end()
        }
        svc.dao.delete(req.params.id)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.put("/message", async (req, res) => {
        console.log(req.body)
        const message= req.body
        if ((message.id === undefined) || (message.id == null) || (!svc.isValidemessage(message))) {
            return res.status(400).end()
        }
        if (await svc.dao.getById(message.id) === undefined) {
            return res.status(404).end()
        }
        svc.dao.updatemessage(message)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}
