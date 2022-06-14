module.exports = (sequelize, dataType)=>{
    let alias="ingredients";
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
        product_id:{
            type: dataType.INTEGER(11),
            allowNull:false
        }
    };
    let config={
        tableName:"ingredients",
        timestamps:false
    };

    const Ingredient = sequelize.define(alias, cols, config);

    Ingredient.associate = (models)=>{
        Ingredient.belongsTo(models.products,{
            as:"products",
            foreignKey: "product_id"
        })
    }

    return Ingredient;
}