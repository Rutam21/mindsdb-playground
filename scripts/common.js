function checkFormInputs(form) {
  const inputs = form.querySelectorAll("input, textarea");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() === "") {
      alert("Please fill in all fields.");
      return false; // Prevent form submission
    }
  }
  return true;
}
