module.exports = (sequelize, dataType)=>{
    let alias="categories";
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
        }
    };
    let config={
        tableName:"categories",
        timestamps:false
    };

    const Category = sequelize.define(alias, cols, config);

    Category.associate = (models)=>{

        Category.belongsToMany(models.products,{
            as:"products",
            through: "product_category",
            foreignKey: "category_id",
            otherKey:"product_id",
            timestamps:false
        });

    }
    
    return Category;
}