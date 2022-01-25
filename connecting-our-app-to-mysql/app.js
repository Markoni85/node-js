const path = require('path');

const express = require('express');
const sequelize = require('./util/database');

const errorController = require('./controllers/error');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use( (req, res, next) => {
    User.findByPk(1)
        .then( user => {
            req.user = user;
            next();
        })
        .catch( error => {
            console.error("App cannot run without loggedin user")
        })
})

//#region  Setup routes

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

//#endregion

//#region Setup assosiations

Product.belongsTo(User, { contraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through : CartItem });
Product.belongsToMany(Cart, { through : CartItem });

//#endregion

sequelize
    // .sync({ force: true })
    .sync()
    .then( result => {
        return User.findByPk(1);
    })
    .then( user => {
        if(!user) {
            return User.create({ name: 'MarkoM', email: 'markom@gmail.com'});
        }

        return Promise.resolve(user);
    })
    .then(systemUser => {
        console.log("Dummy User created ", systemUser);
        // after successfuly sync with database, we can run the server
        systemUser.getCart()
            .then( cart => {
                if(!cart) {
                    systemUser.createCart()
                        .then( cart => {
                            console.error("Creating cart for dummy user");
                        })
                        .catch(err => {
                            console.error("Error creating cart for dummy user");
                        })
                }
            })
            .catch(err => {
                console.error("Error getting cart for dummy user");
            })
    })
    .then( res => {
        console.log("Shopping cart of the dummy user", res);
        app.listen(3000);
    })
    .catch(error => {
        console.log(error);
    })


