import jwt from "jsonwebtoken";
import supabase from "../config/supabaseClient.js";
import ApiError from "../utils/apiError.js";

/**
 * Authentication Controller
 *
 * This controller handles user authentication operations including signup, login, and logout.
 * It interacts with Supabase for user management and uses JWT for secure authentication.
 * It supports both local development and production environments with multiple subdomains.
 */

/**
 * User Signup
 *
 * Registers a new user with Supabase and creates a profile in the 'profiles' table.
 */
export const signup = async (req, res, next) => {
  const { email, password, firstName, lastName, cellNumber } = req.body;

  try {
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
        throw new ApiError(
          429,
          "Too many signup attempts. Please try again later or use a different email address."
        );
      }
      throw new ApiError(400, error.message);
    }

    const userData = data?.user;
    if (!userData || !userData.id) {
      throw new ApiError(500, "User data is incomplete.");
    }

    const { error: insertError } = await supabase.from("profiles").insert({
      user_id: userData.id,
      full_name: `${firstName} ${lastName}`,
      cell_number: cellNumber,
      email,
    });

    if (insertError) throw new ApiError(500, insertError.message);

    res.status(201).json({
      message:
        "User registered successfully. Please check your email to confirm your account.",
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * User Login
 *
 * Authenticates a user, creates a JWT, and sets it as an HTTP-only cookie.
 * Also retrieves and returns the user's profile information.
 */
export const login = async (req, res, next) => {
  console.log("Login attempt:", req.body.email);
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new ApiError(401, error.message);

    const { user } = data;

    if (!user.email_confirmed_at) {
      throw new ApiError(403, "Email not verified");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      domain: isProduction ? ".inventrackapp.com" : undefined,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: "/",
    };

    console.log("Setting cookie with options:", cookieOptions);

    res.cookie("authToken", token, cookieOptions);

    console.log("Cookie set, retrieving user profile");

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (profileError) throw new ApiError(500, profileError.message);

    console.log("Profile retrieved, sending response");
    res.status(200).json({ user, profile });
  } catch (error) {
    next(error);
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
    const { error: supabaseError } = await supabase.auth.signOut({
      scope: "global",
    });
    if (supabaseError) {
      throw new ApiError(500, "Failed to sign out from Supabase");
    }

    console.log("Supabase signOut successful");

    const isProduction = process.env.NODE_ENV === "production";

    // Clear cookie for all scenarios
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    };

    if (isProduction) {
      // Clear for main domain
      res.clearCookie("authToken", {
        ...cookieOptions,
        domain: ".inventrackapp.com",
      });
      // Clear for API subdomain
      res.clearCookie("authToken", {
        ...cookieOptions,
        domain: "api.inventrackapp.com",
      });
    } else {
      // Clear for localhost
      res.clearCookie("authToken", cookieOptions);
    }

    console.log("Authentication cookies cleared");

    // Set cache control headers
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, private"
    );
    res.setHeader("Expires", "-1");
    res.setHeader("Pragma", "no-cache");

    // Add Clear-Site-Data header
    res.setHeader("Clear-Site-Data", '"cookies", "storage"');

    console.log("Logout process completed successfully");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};
