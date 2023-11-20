const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const corsOptions = require("./corsOptions");
const session = require("express-session");
const cors = require("cors");

//The middleware is encapsulated in a module that exports a function accepting app and supabase as arguments. This design ensures that the middleware is easily attachable to your Express app and can interact with Supabase as needed.
module.exports = (app, supabase) => {
  // Security-related Middleware
  // -----------------------------
  //essential for enabling requests from different origins, particularly useful when your frontend and backend are served from different domains.
  app.use(cors(corsOptions));
  //parse the Cookie header and populate req.cookies with an object keyed by the cookie names.
  app.use(cookieParser());

  // Request Parsing Middleware
  // -----------------------------
  //It uses body-parser to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
  app.use(bodyParser.json());

  // Middleware to attach the Supabase client to requests
  app.use((req, res, next) => {
    req.supabase = supabase;
    next();
  });

  // Session Management Middleware
  // -----------------------------
  //The middleware includes a function to attach the Supabase client to requests. This allows you to access Supabase functionalities easily within your request handling.
  //This is crucial for maintaining user state and other data across multiple requests.
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
