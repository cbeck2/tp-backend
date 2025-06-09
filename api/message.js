const jwt2 = require("jwt-decode");
const message = require('../datamodel/message/message');
module.exports = (app, svc) => {
    app.get("/api/message/:pseudo", async (req, res) => {
        let test = jwt2.jwtDecode(req.headers.authorization.slice(7))
        test.login = await svc.dao.getbyemail(test.login)
        test.login = test.login[0].pseudo
        try {
            const message = await svc.dao.getmessage(req.params.pseudo,test.login)
            if (message === undefined) {
                return res.status(404).end()
            }
            return res.json(message)
        } catch (e) { res.status(400).end() }
    })

    app.post("/api/message", async (req, res) => {
        let pseudo=jwt2.jwtDecode(req.headers.authorization.slice(7))
        pseudo.login= await svc.dao.getbyemail(pseudo.login)
        pseudo.login=pseudo.login[0].pseudo
        const mes = await svc.dao.tomessage(req.body, pseudo.login)
        const messa = new message(mes[0],mes[1],mes[2],mes[3],mes[4])
        if (!svc.isValidemessage(req.body)) {//crying alone jurrivh
            return res.status(400).end()
        }
        svc.dao.insertmessage(messa)
            .then(_ => res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}
