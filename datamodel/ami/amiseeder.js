const ami = require('./ami')

module.exports = (serviceami) => {
    return new Promise(async (resolve, reject) => {
        try {
            await serviceami.dao.createami()
            // autres CREATE TABLE...
            for (let i = 1; i < 6; i++) {
                await serviceami.dao.insertami(new ami
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