// CORS configuration to allow requests from both local and deployed frontend
const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://your-deployed-frontend.vercel.app", // Deployed frontend on Vercel
];

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the incoming request's origin is in the allowedOrigins array
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Reject the request
    }
  },
  credentials: true, // Accept cookies via cross-origin requests
};

export default corsOptions;
