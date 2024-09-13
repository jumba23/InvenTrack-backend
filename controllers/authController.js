import jwt from "jsonwebtoken";
import supabase from "../config/supabaseClient.js";

/**
 * Authentication Controller
 *
 * This controller handles user authentication operations including signup, login, and logout.
 * It interacts with Supabase for user management and uses JWT for secure authentication.
 */

/**
 * User Signup
 *
 * Registers a new user with Supabase and creates a profile in the 'profiles' table.
 */
export const signup = async (req, res) => {
  // req.body is already validated by the middleware
  const { email, password, firstName, lastName, cellNumber } = req.body;

  try {
    // Create user in Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          cell_number: cellNumber,
        },
      },
    });

    if (error) {
      if (error.message.includes("Email rate limit exceeded")) {
        return res.status(429).json({
          error:
            "Too many signup attempts. Please try again later or use a different email address.",
        });
      }
      throw error;
    }

    const userData = data?.user;
    if (!userData || !userData.id) {
      throw new Error("User data is incomplete.");
    }

    // Insert user profile into 'profiles' table
    const { error: insertError } = await supabase.from("profiles").insert({
      user_id: userData.id,
      full_name: `${firstName} ${lastName}`,
      cell_number: cellNumber,
      email,
    });

    if (insertError) throw insertError;

    res.status(201).json({
      message:
        "User registered successfully. Please check your email to confirm your account.",
      user: userData,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * User Login
 *
 * Authenticates a user, creates a JWT, and sets it as an HTTP-only cookie.
 * Also retrieves and returns the user's profile information.
 */
export const login = async (req, res) => {
  console.log("Login attempt:", req.body.email);
  const { email, password } = req.body;

  try {
    // Authenticate user with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // const { user, session } = data;
    const { user } = data;

    // Check if email is verified
    if (!user.email_confirmed_at) {
      return res.status(403).json({ error: "Email not verified" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    console.log("Login attempt for:", email);
    console.log("Environment:", process.env.NODE_ENV);
    console.log("Setting cookie with options:", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      domain:
        process.env.NODE_ENV === "production" ? ".vercel.app" : "localhost",
    });
    // Set cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure in production - false in development
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Use 'none' in production, 'lax' in development
      domain:
        process.env.NODE_ENV === "production"
          ? ".inventrackapp.com"
          : "localhost", // Use .inventrackapp.com in production
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
    console.log("Cookie set, sending response");

    // Retrieve user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (profileError) throw profileError;

    // Store session token
    // req.session.user = { token: session.access_token };

    // Send response
    res.status(200).json({ user, profile });
    // res.status(200).json({ user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * User Logout
 *
 * Signs out the user from Supabase, clears the authentication cookie,
 * and invalidates the session.
 */
export const logout = async (req, res, next) => {
  try {
    logger.info("Logout process started", {
      userId: req.user ? req.user.id : "unknown",
    });

    // Sign out from Supabase
    const { error: supabaseError } = await supabase.auth.signOut({
      scope: "global",
    });
    if (supabaseError) {
      logger.error("Supabase signOut error", { error: supabaseError });
      throw new Error("Failed to sign out from Supabase");
    }

    logger.info("Supabase signOut successful");
    console.log("Supabase signOut successful");

    // Clear the authentication cookie
    res.cookie("authToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    });

    logger.info("Authentication cookie cleared");
    console.log("Authentication cookie cleared");

    // Destroy the session
    if (req.session) {
      await new Promise((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) {
            logger.error("Session destruction error", { error: err });
            reject(new Error("Error destroying session"));
          } else {
            logger.info("Session destroyed successfully");
            res.clearCookie("connect.sid", { path: "/" });
            resolve();
          }
        });
      });
    } else {
      logger.info("No session to destroy");
    }

    // Set cache control headers
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, private"
    );
    res.setHeader("Expires", "-1");
    res.setHeader("Pragma", "no-cache");

    logger.info("Logout process completed successfully");
    console.log("Logout process completed successfully");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout process failed", {
      error: error.message,
      stack: error.stack,
    });
    logger.error("Logout process failed", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      error: "An error occurred during logout",
      details: error.message,
    });
  }
};
