module.exports = class  message{
    constructor(idauteur,idrecepteur,message,pseudoauteur,pseudorecepteur,id=0) {
        this.idauteur = idauteur
        this.idrecepteur = idrecepteur
        this.message = message
        this.pseudoauteur = pseudoauteur
        this.pseudorecepteur = pseudorecepteur
        this.id = id
    }
}