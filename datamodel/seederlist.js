const list = require('./list')

module.exports = (servicelist) => {
    return new Promise(async (resolve, reject) => {
            try {
                // autres CREATE TABLE...
                await servicelist.dao.createlist()
                for (let i = 0; i < 5; i++) {
                    await servicelist.dao.insertlist(new list(i,"shop" + i,
                        new Date(+(new Date()) - Math.floor(Math.random() * 10000000000))
                        , true)
                    )
                }
                resolve()
            } catch (e) {
                if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                    resolve()
                } else {
                    reject(e)
                }
                return
            }
        }
    )
}