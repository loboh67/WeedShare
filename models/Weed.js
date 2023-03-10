module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Weed', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // datesBought stores the dates in an array
        datesBought: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};

