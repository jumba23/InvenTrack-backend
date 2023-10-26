const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.signup = async (req, res) => {
  const { email, password, firstName, lastName, cellNumber } = req.body;

  console.log("email", email);
  console.log("password", password);
  console.log("firstName", firstName);
  console.log("lastName", lastName);
  console.log("cellNumber", cellNumber);

  // Implement your signup logic here, using Supabase
  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (!user) {
    return res.status(400).json({ error: "User not created" });
  }

  // Wait for 5 seconds to give the user time to click on the verification link
  await new Promise((resolve) => setTimeout(resolve, 10000));
  console.log("create user", user);

  // Once the user is successfully created, save additional profile data
  // const { data, error: insertError } = await supabase.from("profiles").insert({
  //   user_id: user.id,
  //   first_name: firstName,
  //   last_name: lastName,
  //   cell_number: cellNumber,
  // });

  // if (insertError) {
  //   return res.status(400).json({ error: insertError.message });
  // }

  // // Return both the user and their additional data
  // res.status(201).json({ user, profile: data });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log("server REQUEST - username", username);
  console.log("server REQUEST - password", password);

  // Implement your login logic here, again using Supabase for simplicity
  const { user, error, session } = await supabase.auth.signInWithPassword({
    email: username,
    password: password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (!session) {
    return res.status(400).json({ error: "Session not created" });
  }
  // Store the token or session info on the server side or return it to the client
  // In this example, we'll return it to the client
  res.status(200).json({ user, token: session.access_token });
};
