// CORS options for the server
const allowedOrigins = [
  "http://localhost:3000", // For local development
  "https://app.inventrackapp.com", // Frontend subdomain in production
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies and credentials
  methods: ["GET", "POST", PUT, "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;
