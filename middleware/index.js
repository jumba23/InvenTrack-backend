import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import corsOptions from "./corsOptions.js";
import fileUpload from "express-fileupload";
// import session from "express-session";
import cors from "cors";

// The middleware is encapsulated in a module that exports a function accepting app and supabase as arguments.
// This design ensures that the middleware is easily attachable to your Express app and can interact with Supabase as needed.
const indexMiddleware = (app, supabase) => {
  // Security-related Middleware
  // -----------------------------
  // Essential for enabling requests from different origins, particularly useful when your frontend and backend are served from different domains.
  app.use(cors(corsOptions));
  // Parse the Cookie header and populate req.cookies with an object keyed by the cookie names.
  app.use(cookieParser());

  // Request Parsing Middleware
  // -----------------------------
  // It uses body-parser to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
  app.use(bodyParser.json());

  // Supabase Middleware for file uploads
  // -----------------------------
  // This middleware is essential for handling file uploads in your application.
  // It uses the express-fileupload package to parse multipart/form-data requests and make the uploaded files available under req.files.
  app.use(fileUpload());

  // Middleware to attach the Supabase client to requests
  app.use((req, res, next) => {
    req.supabase = supabase;
    next();
  });

  // Session Management Middleware
  // -----------------------------
  // This is crucial for maintaining user state and other data across multiple requests.
  // app.use(
  //   session({
  //     secret: process.env.SESSION_SECRET,
  //     resave: false,
  //     saveUninitialized: false, // Changed to false for better security
  //     cookie: {
  //       secure: process.env.NODE_ENV === "production",
  //       httpOnly: true,
  //       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  //       maxAge: 24 * 60 * 60 * 1000, // 24 hours
  //     },
  //   })
  // );
};

export default indexMiddleware;
