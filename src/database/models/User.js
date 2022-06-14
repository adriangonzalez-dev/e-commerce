module.exports = (sequelize, dataType)=>{
    let alias="users";
    let cols={
        id:{
            type:dataType.INTEGER(11),
            primaryKey:true,
            allowNull: false,
            autoIncrement: true
        },
        name:{
            type: dataType.STRING(50),
            allowNull:false
        },
        surname:{
            type:dataType.STRING(50),
            allowNull:false
        },
        email:{
            type:dataType.STRING(50),
            allowNull:false
        },
        pass:{
            type:dataType.STRING(50),
            allowNull:false
        },
        avatar:{
            type:dataType.STRING(100),
            allowNull:true
        },
        rol:{
            type:dataType.BOOLEAN,
            allowNull:false
        },
        address_id:{
            type:dataType.INTEGER(11),
            allowNull:false
        }
    };
    let config={
        tableName:"users",
        timestamps:false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = (models)=>{
        User.belongsTo(models.address,{
            as:"address",
            foreignKey: "address_id"
        });
    }
    
    return User;
}