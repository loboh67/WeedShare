module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Smoke', {
        weedName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dateSmoked: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        persons: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
};