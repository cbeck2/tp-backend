const listDAO = require("../datamodel/listdao");

module.exports = class servicelist {
    constructor(db) {
        this.dao = new listDAO(db)
    }
    isValidlist(list) {
        list.shop = list.shop.trim()
        if (list.shop === "") {
            return false
        }
        if ((list.archived!==true)&&(list.archived!==false)) {
            return false
        }
        if (list.date != null) {
            if (list.date instanceof String) {
                list.date = new Date(list.date)
                console.log(list.date)
            }
            if (list.date >= new Date()) {
                return false
            }
        }
        return true
    }
}