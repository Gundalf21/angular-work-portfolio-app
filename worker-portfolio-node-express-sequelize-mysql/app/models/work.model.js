module.exports = (sequelize, Sequelize) => {
    const Work = sequelize.define("work", {
        workName: {
            type: Sequelize.STRING
        },
        clientName: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        },
        image: {
            type: Sequelize.STRING
        }
    });

    return Work;
};