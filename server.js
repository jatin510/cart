const express = require('express')
const app = express()
const PORT = process.env.PORT || 7777
const {
    db,
    Vendors,
    Products,
    Cart
} = require('./db/db')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/', express.static(__dirname + '/public'))


//add new product

app.post('/add_product', async (req, res) => {
    let x = await Products.create({
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price,
        vendorId: req.body.vendorId
    })
    let vendor = await Vendors.findOne({
        where: {
            id: req.body.vendorId
        }
    })

    res.send({
        x,
        vendor
    })
})
app.get('/show_products', async (req, res) => {
    let products = await Products.findAll({
        include: [Vendors]
    })
    res.send(products)
})

app.post('/delete_product', async (req, res) => {
    console.log('delete req')
    await Products.destroy({
        where: {
            id: req.body.id
        }
    })
    res.send('')
})

//add to cart 

app.post('/addToCart', async (req, res) => {
    let check_cart = await Cart.findOne({
        where: {
            productName: req.body.name,
            username: req.body.username,
        }
    })
    if (check_cart) {
        await Cart.update({
            qty: parseInt(check_cart.qty) + 1
        }, {
            where: {
                id: check_cart.id
            }
        })
    } else {
        let product = await Products.findOne({
            where: {
                name: req.body.name
            }
        })
        await Cart.create({
            username: req.body.username,
            productName: req.body.name,
            productId: product.id,
            qty: 1,
            price: product.price,
            vendorId: product.vendorId
        })
    }
})

//cart handling
app.post('/show_cart', async (req, res) => {
    let cart = await Cart.findAll({
        include: [Vendors]
    }, {
        where: {
            username: req.body.username
        }
    })
    res.send(cart)
})

//vendor handlers
app.post('/add_vendor', async (req, res) => {
    let x = await Vendors.create({
        name: req.body.name
    })
    res.send(x)
})
app.get('/show_vendors', async (req, res) => {
    let vendors = await Vendors.findAll()
    res.send(vendors)
})
app.post('/delete_vendor', async (req, res) => {
    await Vendors.destroy({
        where: {
            id: req.body.id
        }
    })
    res.send('')
})



db.sync({
        force: false
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log('server started at http://localhost:' + PORT)

        })
    })