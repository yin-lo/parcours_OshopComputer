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
                association: 'products',
            });

            res.render('category', {
                category,
            });

        } catch (error) {
            console.log(error);
            res.status(500).send('Error with categories');
        }
    },

    product: async (req, res) => {
        // todo, récupérer le produit demandé en base de données.
        res.render('product');
    },

    cart: (req, res) => {
        res.render('cart');
    },
};

module.exports = catalogController;
