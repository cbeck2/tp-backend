const message = require('./message')

module.exports = (servicemessage) => {
    return new Promise(async (resolve, reject) => {
        try {
            await servicemessage.dao.createmessage()
            // autres CREATE TABLE...
            for (let i = 0; i < 5; i++) {
                await servicemessage.dao.insertmessage(new message
                    (2
                    ,2
                    ,"yolooooooy"+i
                    ,"melanoob"+i
                    ,/*date*/new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)))
                )
            }
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
            } else {
                reject(e)
            }
            return
        }
    })
}