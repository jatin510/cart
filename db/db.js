const Sequelize = require('sequelize')
const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/shop.db'
})

const Vendors = db.define('vendors', {
    name: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
    }
})

const Products = db.define('products', {
    name: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
    },
    qty: {
        type: Sequelize.STRING(10),
        default: 0,
    },
    price: {
        type: Sequelize.STRING(10),
        default: 0,
    },
    vendorId: {
        type: Sequelize.STRING(10),
        references: {
            model: Vendors,
            key: 'id'
        }
    }
})

const Cart = db.define('cart', {
    username: {
        type: Sequelize.STRING(30),
    },
    productName: {
        type: Sequelize.STRING(30),
        unique: true
    },
    qty: {
        type: Sequelize.STRING(10),
        default: 0,
    },
    price: {
        type: Sequelize.STRING(10),
        default: 0,
    },
    productId: {
        type: Sequelize.STRING(10),
        references: {
            model: 'Products',
            key: 'id'
        }
    }

})

Vendors.hasMany(Products)
Products.hasMany(Cart)
Products.belongsTo(Vendors)
Cart.belongsTo(Vendors)

module.exports = {
    db,
    Vendors,
    Products,
    Cart
}