import passport from 'passport';
import UserModel from '../dao/models/user.model.js';
import GithubStrategy from 'passport-github2';

const initializePassport = () => {

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