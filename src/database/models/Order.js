module.exports = (sequelize, dataType)=>{
    let alias="orders";
    let cols={
        id:{
            type:dataType.INTEGER(11),
            primaryKey:true,
            allowNull: false,
            autoIncrement: true
        },
        user_id:{
            type: dataType.INTEGER(11),
            allowNull:false
        },
        state:{
            type: dataType.INTEGER(11),
            allowNull:false
        }
    };
    let config={
        tableName:"orders",
        timestamps:false
    };

    const Order = sequelize.define(alias, cols, config);

    return Order;
}