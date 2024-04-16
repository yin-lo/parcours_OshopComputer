const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { User, Role } = require('../models');

const userController = {
    index: (req, res) => {
        res.render('register');
    },

    register: async (req, res) => {
        try {
            // desctructuration de l'objet req.body
            const { firstname, lastname, email, password, confirm } = req.body;

            // avoir tous les champs
            if (!firstname || !lastname || !email || !password || !confirm) {
                throw new Error(`Tous les champs sont obligatoires`);
            }

            // vérifier l'email avec le package npm email-validator
            if (!emailValidator.validate(email)) {
                throw new Error(`L'email doit être valide`);
            }

            // vérifier si password correspond à password confirm
            if (password !== confirm) {
                throw new Error(`Les 2 mots de passes sont différents`);
            }

            // hash password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            // sauvegarder user
            const [user, created] = await User.findOrCreate({
                where: {
                    email: email,
                },
                defaults: {
                    name: `${firstname} ${lastname}`,
                    password: hash,
                    role_id: 1, // attribuer un rôle ici, le rôle customer.
                },
            });

            if (!created) {
                throw new Error(`Un compte existe déjà avec cet email`);
            }

            // !! ne pas modifier cette ligne
            res.render('login', {
                message: 'Vous pouvez maintenant vous connecter !',
            });
        } catch (error) {
            console.log(error);
            res.render('register', { error: error.message });
        }
    },

    show: async (req, res) => {
        res.render('dashboard/dashboard');
    },
};

module.exports = userController;
