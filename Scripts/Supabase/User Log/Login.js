
$("#wf-form-SignIn-Form").on("submit", function (e) {
  e.preventDefault();

  const email = $("#signin_email").val(), 
  password = $("#signin_password").val();

  SUPABASE.userSignIn(email, password);
});


$("#wf-form-SignUp-Form").on("submit", function (e) {
  e.preventDefault();

  const email = $("#signup_email").val(),
  password = $("#signup_password").val(),
  name = $("#signup_name").val(),
  last_name = $("#signup_last_name").val();

  //todo CHECK IF THE PASSWORDS ARE EQUAL

  SUPABASE.userSignUp(email, password, name, last_name);
});