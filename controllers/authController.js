const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  // Implement your signup logic here, probably using Supabase
  const { user, error } = await supabase.auth.signUp({
    email: username,
    password: password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ user });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Implement your login logic here, again using Supabase for simplicity
  const { user, error, session } = await supabase.auth.signInWithPassword({
    email: username,
    password: password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // Store the token or session info on the server side or return it to the client
  // In this example, we'll return it to the client
  res.status(200).json({ user, token: session.access_token });
};
