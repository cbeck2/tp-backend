const interet = require('./interet')

module.exports = (serviceinteret) => {
    return new Promise(async (resolve, reject) => {
        try {
            await serviceinteret.dao.createinteret()
            // autres CREATE TABLE...
            for (let i = 1; i < 6; i++) {
                await serviceinteret.dao.insertinteret(new interet
                    (i,i)
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