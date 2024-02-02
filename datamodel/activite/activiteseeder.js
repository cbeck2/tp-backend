const activite = require('./activite')

module.exports = (serviceactivite) => {
    return new Promise(async (resolve, reject) => {
        try {
            await serviceactivite.dao.createactivite()
            // autres CREATE TABLE...
            for (let i = 0; i < 5; i++) {
                await serviceactivite.dao.insertactivite(new activite
                    ("mélanie"+i)
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