function handleSentiment(event) {
  event.preventDefault();
  const inputText = document.getElementById("sentimentInput").value;
  const resultDiv = document.getElementById("sentimentResult");

  const engines = document.getElementsByName("sentimentEngine");

  const selectedEngine = Array.from(engines).find(
    (engine) => engine.checked
  )?.value;

  // Clear the input field
  document.getElementById("sentimentInput").value = "";

  // Loading Screen
  document.getElementById("loading-screen").style.display = "block";

  const sentimentCloseButton = document.querySelector(".home-button04");
  const sentimentDiv = document.querySelector("#sentimentDiv");

  sentimentCloseButton.addEventListener("click", () => {
    sentimentDiv.style.display = "none";
  });

  // Send a POST request to /analyze endpoint
  try {
    fetch("/analyze", {
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
            data.prediction + "<br/><br/> Powered by " + data.selectedEngine;
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("sentimentDiv").style.display = "block";
        } else {
          resultDiv.innerHTML =
            "We are caught in the middle of an error. Please try Again!";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("sentimentDiv").style.display = "block";
        }
      })
      .catch((error) => {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while analyzing sentiment");
        throw error;
      });
  } catch (error) {
    document.getElementById("loading-screen").style.display = "none";
    alert("An error occurred while analyzing sentiment");
  }
}
