const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const corsOptions = require("./corsOptions");
const session = require("express-session");
const cors = require("cors");

module.exports = (app, supabase) => {
  // Security-related Middleware
  // -----------------------------
  app.use(cors(corsOptions));
  app.use(cookieParser());

  // Request Parsing Middleware
  // -----------------------------
  app.use(bodyParser.json());

  // Middleware to attach the Supabase client to requests
  app.use((req, res, next) => {
    req.supabase = supabase;
    next();
  });

  // Session Management Middleware
  // -----------------------------
  app.use(
    session({
      secret: process.env.SESSION_SECRET, // Secret for signing the session ID cookie.
      resave: false,
      saveUninitialized: true,
      // In a production environment, it's best practice to use "true" to
      //ensure cookies are transmitted over secure protocols only.
      cookie: { secure: process.env.NODE_ENV === "production" }, //currently set to false for development
    })
  );
};
