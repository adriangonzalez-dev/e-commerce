module.exports = (sequelize, dataType)=>{
    let alias="address";
    let cols={
        id:{
            type:dataType.INTEGER(11),
            primaryKey:true,
            allowNull: false,
            autoIncrement: true
        },
        location:{
            type: dataType.STRING(50),
            allowNull:false
        }
    };
    let config={
        tableName:"address",
        timestamps:false
    };

    const Address = sequelize.define(alias, cols, config);

    Address.associate = (models)=>{
        Address.hasMany(models.users,{
            as:"users",
            foreignKey: "address_id"
        });
    }
    
    return Address;
}