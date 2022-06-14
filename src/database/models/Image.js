module.exports = (sequelize, dataType)=>{
    let alias="images";
    let cols={
        id:{
            type:dataType.INTEGER(11),
            primaryKey:true,
            allowNull: false,
            autoIncrement: true
        },
        src:{
            type: dataType.STRING(200),
            allowNull:true
        },
        product_id:{
            type: dataType.INTEGER(11),
            allowNull:false
        }
    };
    let config={
        tableName:"images",
        timestamps:false
    };

    const Image = sequelize.define(alias, cols, config);
    
    Image.associate = (models)=>{
        Image.belongsTo(models.products,{
            as:"products",
            foreignKey: "product_id"
        })
    }

    return Image;
}