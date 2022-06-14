module.exports = (sequelize, dataType)=>{
    let alias="orders_product";
    let cols={
        id:{
            type:dataType.INTEGER(11),
            primaryKey:true,
            allowNull: false,
            autoIncrement: true
        },
        order_id:{
            type: dataType.INTEGER(11),
            allowNull:false
        },
        product_id:{
            type: dataType.INTEGER(11),
            allowNull:false
        },
        cant_products:{
            type: dataType.INTEGER(11),
            allowNull:false
        }
    };
    let config={
        tableName:"orders_product",
        createdAt: "created_at",
        updatedAt: false,
        deletedAt: false
    };

    const Order_product = sequelize.define(alias, cols, config);
    
    return Order_product;
}