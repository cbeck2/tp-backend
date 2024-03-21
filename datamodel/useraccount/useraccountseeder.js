const message = require('./useraccount')

module.exports = (userAccountService) => {
    return new Promise(async (resolve, reject) => {
        try {
            await userAccountService.dao.db.query("CREATE TABLE useraccount(id SERIAL PRIMARY KEY, login TEXT NOT NULL, challenge TEXT NOT NULL)")
        } catch (e) {
            if (e.code === "42P07") {
                resolve()
            } else {
                reject(e)
            }
            return
        }
    })
}