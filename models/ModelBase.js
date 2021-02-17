class ModelBase {

    tableName = ""
    id_Column = ""
    constructor(tableName,id_Column = "id"){
        this.tableName = tableName;
        this.id_Column = id_Column;
    }
}

module.exports = ModelBase;