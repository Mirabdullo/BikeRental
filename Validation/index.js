const management = require('./AdsManagement');
const category = require('./BikeCategory');
const bike = require('./BikeInfo');
const client = require('./Client');
const payment = require('./Payment');
const penalty = require('./Penalty')
const rental = require('./Rental');
const shop = require('./ShopInfo');
const user = require('./User');
const userGroup = require('./UserGroup');

module.exports = {
    management,
    category,
    bike,
    client,
    userGroup,
    payment,
    penalty,
    rental,
    shop,
    user
}