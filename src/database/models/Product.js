module.exports = (sequelize, dataType)=>{
    let alias="products";
    let cols={
        id:{
            type:dataType.INTEGER(11),
            primaryKey:true,
            allowNull: false,
            autoIncrement: true
        },
        name:{
            type: dataType.STRING,
            allowNull:false
        },
        price:{
            type:dataType.INTEGER,
            allowNull:false
        },
        description:{
            type:dataType.TEXT,
            allowNull:false
        },
        coment:{
            type:dataType.TEXT,
            allowNull:true
        },
        weight:{
            type:dataType.STRING,
            allowNull:true
        },
        offer:{
            type:dataType.INTEGER,
            allowNull:true
        },
        stock:{
            type:dataType.INTEGER,
            allowNull:false
        },
        discount:{
            type:dataType.INTEGER,
            allowNull:true
        }
    };
    let config={
        tableName:"products",
        timestamps:false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models)=>{
        Product.hasMany(models.images,{
            as:"images",
            foreignKey: "product_id"
        });

        Product.hasMany(models.ingredients,{
            as:"ingredients",
            foreignKey: "product_id"
        });

        Product.belongsToMany(models.categories,{
            as:"categories",
            through: "product_category",
            foreignKey: "product_id",
            otherKey:"category_id",
            timestamps:false
        });
    }
    return Product;
}