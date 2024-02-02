module.exports = class  message{
    constructor(idauteur,idrecepteur,message,attachement,date,id=0) {
        this.idauteur = idauteur
        this.idrecepteur = idrecepteur
        this.message = message
        this.attachement = attachement
        this.date = date
        this.id = id
    }
}