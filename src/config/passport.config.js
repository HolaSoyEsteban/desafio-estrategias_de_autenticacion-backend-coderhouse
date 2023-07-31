import passport from 'passport';
import local from 'passport-local';
import GithubStrategy from 'passport-github2';
import UserModel from '../dao/models/user.model.js';

const initializePassport = () => {

    // passport.use('register', new LocalStrategy({
    //     passReqToCallback: true,
    //     usernameField: 'email'
    // }, async (req, username, password, done) => {
    //     const { first_name, last_name, email, age } = req.body;
    //     try {
    //         const user = await UserModel.findOne({ email: username })
    //         if (user) return done(null, false, { message: 'El correo electrónico ya está en uso.' })

    //     }
    // }))
    
    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.406a2cb748fca137',
        clientSecret: '0911404c5380ce804ebe9cbfa5aa7d476ebbdfb7',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        try {
            const user = await UserModel.findOne({ email: profile._json.email})
            if (user) return done(null, user)
            const newUser = await UserModel.create({
                first_name: profile._json.name,
                last_name: " ",
                email: profile._json.email,
                age: 0,
                password: " "
            })
            return done(null, newUser)
        }
        catch (error) {
            console.log(error.message)
            return done('Error al intentar loguearse con Github.')
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id);
        done(null, user);
    })

}

export default initializePassport;