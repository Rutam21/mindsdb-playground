function handleJson(event) {
  event.preventDefault();
  const inputText = document.getElementById("jsonInput").value;
  const resultDiv = document.getElementById("jsonResult");

  // Clear the input field
  document.getElementById("jsonInput").value = "";

  // Loading Screen
  document.getElementById("loading-screen").style.display = "block";

  const engines = document.getElementsByName("jsonEngine");
  const selectedEngine = Array.from(engines).find(
    (engine) => engine.checked
  )?.value;

  const jsonCloseButton = document.querySelector(".home-button10");
  const jsonDiv = document.querySelector("#jsonDiv");

  jsonCloseButton.addEventListener("click", () => {
    jsonDiv.style.display = "none";
  });

  // Send a POST request to /predict endpoint
  try {
    fetch("/json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputText, selectedEngine }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the prediction
        if (!data.error) {
          resultDiv.innerHTML =
            "Find the extracted JSON from the above synopsis below : <br/><br/>" +
            "<b>Movie Name:</b> " +
            data.json.Movie +
            "<br/><b>Director:</b> " +
            data.json.Director +
            "<br/><b>Plot:</b> " +
            data.json.Plot +
            "<br/><b>Starcast:</b> " +
            data.json.Starcast +
            "<br/><br/> Powered by " +
            data.selectedEngine;
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("jsonDiv").style.display = "block";
        } else {
          resultDiv.innerHTML =
            "We are caught in the middle of an error. Please try Again!";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("jsonDiv").style.display = "block";
        }
      })
      .catch((error) => {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while finding JSON data");
        throw error; // add this line to throw the error
      });
  } catch (error) {
    document.getElementById("loading-screen").style.display = "none";
    alert("An error occurred while finding JSON data");
  }
}
