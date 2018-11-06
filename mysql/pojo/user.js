const Sequelize = require('sequelize');
const sequelize = require('./../conn');

console.log(process.env.NODE_ENV);
console.log(process.env);

const Test = sequelize.define('tests', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
});

sequelize
    .sync()
    .then(res => {
        return Test.findAll({
            attributes: ['username']
        });
    })
    .then(res => {
        res.forEach(v => {
            let { dataValues } = v;
            console.log(dataValues);
        });
        sequelize.close();
    })
    .catch(e => {
        console.log(e);
    });
