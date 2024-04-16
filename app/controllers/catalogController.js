const { Category, Product } = require('../models');

const catalogController = {
    index: async (req, res) => {
        res.render('index');
    },

    productsList: async (req, res) => {
        try {
            const products = await Product.findAll();
            const categories = await Category.findAll();

            res.render('shop', {
                categories,
                products,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    },

    category: async (req, res) => {
        try {
            const categoryId = Number(req.params.id);
            const category = await Category.findByPk(categoryId, {
                include:[
                    { association: 'products',}
                ],
            });

            res.render('category', {
                category,
            });

        } catch (error) {
            console.log(error);
            res.status(500).send('Error with categories and products');
        }
    },

    product: async (req, res) => {
        try {
            const productId = Number(req.params.id);
            const product = await Product.findByPk(productId);
          
            res.render('product', {
                product,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Error with products');
        }
    },

    cart: (req, res) => {
        res.render('cart');
    },
};

module.exports = catalogController;
