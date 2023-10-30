const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
    });

  if (insertError) {
    return res.status(400).json({ error: insertError.message });
  }

  console.log("Profile data", profile);

  // Return both the user and their additional data
  res.status(201).json({ new_user: data });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("server REQUEST - req.body", req.body);
  console.log("server REQUEST - email", email);
  console.log("server REQUEST - password", password);

  // Implement your login logic here, again using Supabase for simplicity
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (!data) {
    return res.status(400).json({ error: "User not found" });
  }

  console.log("Login Supabase data", data);

  const { user, session } = data;

  if (!data.session) {
    return res.status(400).json({ error: "Session not created" });
  }
  // Store the token or session info on the server side or return it to the client
  // In this example, we'll return it to the client
  res.status(200).json({ user, token: session.access_token });
};

exports.logout = async (req, res) => {
  const { logout } = req.body;
  console.log("Server received req - logout", logout);
  if (logout) {
    // Implement your logout logic here, using Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    // Return a success message
    res.status(200).json({ message: "User logged out successfully" });
  }
};
