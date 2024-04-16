const bcrypt = require('bcrypt');
const { User, Role } = require('../models');

const sessionController = {
    index: (req, res) => {
        res.render('login');
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
  
            // avoir tous les champs :
            if (!email || !password) {
                throw new Error(`Les champs sont obligatoires`);
            };

            // On récupère user avec email et inclure le role
            const user = await User.findOne({
                where: {email: email},
                include: "role",
            });

            // Est-ce que l'utilisateur existe en BDD ?
            // Si on ne le trouve pas on envoie un message d'erreur dans un objet:  {error: "Utilisateur ou mot de passe incorrect"} et on render `login` en lui passant l'erreur

            if (!user) {
                throw new Error("Utilisateur ou mot de passe incorrect");
            }

            // Sinon on continue.

            // Le mot de passe est il correct ?
            // On compare le mots de passe du formulaire avec celui de l'utilisateur
            const passwordIsValid = await bcrypt.compare(
                password, 
                user.password,
            );

            //      Si le mot de passe est incorrect : on envoie un message d'erreur dans un objet:  {error: "Utilisateur ou mot de passe incorrect"} et on render `login` en lui passant l'erreur

            if (!passwordIsValid) {
               throw new Error("Utilisateur ou mot de passe incorrect");
            }

            // On ajoute user à la session
            req.session.user = user;

            // On enlève le mot de passe de la session.
            req.session.user.password = undefined;

            // !! Ne pas modifier cette ligne
            res.redirect('/');
            
        } catch (error) {
            console.error(error.message);
            res.render('login', {
                error: error.message
            });
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    },
};

module.exports = sessionController;
