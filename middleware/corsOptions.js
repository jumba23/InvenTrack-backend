const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://invent-track-frontend.vercel.app", // Deployed frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Reject the request
    }
  },
  credentials: true, // Accept cookies via cross-origin requests
};

export default corsOptions;
