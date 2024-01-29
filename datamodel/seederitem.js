const item = require('./item')
const list = require("./list");

module.exports = (itemService) => {
    return new Promise(async (resolve, reject) => {
            try {
                await itemService.dao.createitem()
                // autres CREATE TABLE...
                for (let i = 0; i < 5; i++) {
                    await itemService.dao.insertitem(new item(i
                        ,"label" + i
                        ,i
                        ,true
                        ,1)
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