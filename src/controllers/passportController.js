import passport from "passport";
import passportLocal from "passport-local";
import userQuery from "../models/userQuery.js";
import userQueries from "../models/userQuery.js";

let LocalStrategy = passportLocal.Strategy;

async function initPassportLocal() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          let user = await userQueries.findUserByEmail(email);
          console.log(user);
          if (!user) {
            return done(null, false, "No User");
          } else {
            let match = await userQueries.comparePassword(user, password);
            if (match === true) {
              return done(null, user, null);
            } else {
              return done(null, false, "Password did'nt match");
            }
          }
        } catch (err) {}
      }
    )
  );
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    let user = await userQuery.findUserById(id);
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
});

export default initPassportLocal;
