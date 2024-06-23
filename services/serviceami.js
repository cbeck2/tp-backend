const ExempleDAO = require("../datamodel/ami/amidao")

module.exports = class Serviceami {
    constructor(db) {
        this.dao = new ExempleDAO(db)
    }
    async isValideami(ami) {
        //let idutilisateur1 = svc.getByLogin(ami.idutilisateur1)
        ami=await this.dao.getByLogin(ami.idutilisateur1)
        if (parseInt(ami.id)==null) {
            return false
        }
        if (parseInt(ami.idutilisateur2)==null) {
            return false
        }
        return true
    }
}