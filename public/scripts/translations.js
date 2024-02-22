function handleTranslation(event) {
  event.preventDefault();
  const inputText = document.getElementById("translationInput").value;
  const choice = document.getElementById("translationChoice").value;
  const resultDiv = document.getElementById("translationResult");

  // Clear the input field
  document.getElementById("translationInput").value = "";

  // Loading Screen
  document.getElementById("loading-screen").style.display = "block";

  const engines = document.getElementsByName("translationEngine");

  const selectedEngine = Array.from(engines).find(
    (engine) => engine.checked
  )?.value;

  const translationCloseButton = document.querySelector(".home-button06");
  const translationDiv = document.querySelector("#translationDiv");

  translationCloseButton.addEventListener("click", () => {
    translationDiv.style.display = "none";
  });

  // Send a POST request to /predict endpoint
  try {
    fetch("/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputText, selectedEngine, choice }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the prediction
        if (!data.error) {
          resultDiv.innerHTML =
            "The " +
            choice +
            " translation is: <br/><br/>" +
            data.translation +
            "<br/><br/> Powered by " +
            data.selectedEngine;
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("translationDiv").style.display = "block";
        } else {
          resultDiv.innerHTML =
            "We are caught in the middle of an error. Please try Again!";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("translationDiv").style.display = "block";
        }
      })
      .catch((error) => {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while translating the text");
        throw error; // add this line to throw the error
      });
  } catch (error) {
    document.getElementById("loading-screen").style.display = "none";
    alert("An error occurred while translating the text");
  }
}
