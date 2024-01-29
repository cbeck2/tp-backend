const itemDAO = require("../datamodel/itemdao");

module.exports = class serviceitem {
    constructor(db) {
        this.dao = new itemDAO(db)
    }
    isValiditem(item) {
        item.label = item.label.trim()
        if (item.label === "") {
            return false
        }
        if ((item.checked!==false)&&(item.checked!==true)) {
            return false
        }
        if (parseInt(item.quantity)===null) {
            return false
        }
        if (parseInt(item.listid)===null) {
            return false
        }
        else{
            return true
        }
    }
}