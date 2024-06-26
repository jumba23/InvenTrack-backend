const { createClient } = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// TO DO - write a short explanation for this controller

// SIGNUP method
exports.signup = async (req, res) => {
  const { email, password, firstName, lastName, cellNumber } = req.body;

  // Implement your signup logic here, using Supabase
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        cell_number: cellNumber,
      },
    },
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  } else {
    console.log("data", data);
  }

  const userData = data?.user;

  // Check if userData actually exists and contains an 'id'
  if (!userData || !userData.id) {
    return res.status(400).json({ error: "User data is incomplete." });
  }

  // Once the user is successfully created, save additional profile data
  const { data: profile, error: insertError } = await supabase
    .from("profiles")
    .insert({
      user_id: userData.id,
      first_name: firstName,
      last_name: lastName,
      cell_number: cellNumber,
      full_name: `${firstName} ${lastName}`,
      email: email,
    });

  if (insertError) {
    return res.status(400).json({ error: insertError.message });
  }

  // console.log("Profile data", profile);

  // Return both the user and their additional data
  res.status(201).json({ new_user: data });
};

//LOGIN method
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  console.log("data - login method", data);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const { user, session } = data;

  if (!user.email_confirmed_at) {
    return res.status(400).json({ error: "Email not verified" });
  }

  // Generate a JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  // Set the JWT in an HTTP-only cookie
  res.cookie("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // use secure cookies in production
    sameSite: "strict",
  });

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (profileError) {
    return res.status(400).json({ error: profileError.message });
  }

  // Store user info in session
  req.session.user = { token: session.access_token };
  // console.log("Token in Session:", req.session.user.token);

  res.status(200).json({ user, profile });
};

// LOUGOUT method
exports.logout = async (req, res) => {
  const { logout } = req.body;
  console.log("Server received req - logout", logout);
  if (logout) {
    // Implement your logout logic here, using Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    // JWT cleared from cookie
    res.clearCookie("authToken");
    // Return a success message
    res.status(200).json({ message: "User logged out successfully" });
  }
};
