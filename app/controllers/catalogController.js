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
                products 
            });

        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    },

    category: async (req, res) => {
        try {
            // on récupère l'id de la route paramétrée
            const id = req.params.id;
            // on ajoute un include pour avoir accès à une propriété products sur l'objet category contenant les produits dans un tableau 
            const category = await Category.findByPk(id, {
                include: 'products',
            });
            res.render('category', {
                category,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    },

    product: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await Product.findByPk(id);
            res.render('product', {
                product,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    },

    cart: (req, res) => {
        res.render('cart');
    },
};

module.exports = catalogController;
