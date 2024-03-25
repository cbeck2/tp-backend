const message = require('./useraccount')

module.exports = (userAccountService) => {
    return new Promise(async (resolve, reject) => {
        try {
            await userAccountService.dao.createuseraccount()
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