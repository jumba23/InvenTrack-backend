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
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    const { user, session } = data;
    if (!user.email_confirmed_at) {
      throw new Error("Email not verified");
    }

    // Generate and set JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Retrieve user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (profileError) throw profileError;

    // Store session token
    req.session.user = { token: session.access_token };

    res.status(200).json({ user, profile });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * User Logout
 *
 * Signs out the user from Supabase, clears the authentication cookie,
 * and invalidates the session.
 */
export const logout = async (req, res) => {
  try {
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Clear the authentication cookie
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Protect against CSRF
    });

    // Destroy the session
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
        }
      });
    }

    // Set cache control headers to prevent caching of this response
    res.setHeader("Cache-Control", "no-store, max-age=0");

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "An error occurred during logout" });
  }
};
