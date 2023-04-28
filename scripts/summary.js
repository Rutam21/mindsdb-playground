function handleSummary(event) {
  event.preventDefault();
  const inputText = document.getElementById("summaryInput").value;
  const resultDiv = document.getElementById("summaryResult");

  // Clear the input field
  document.getElementById("summaryInput").value = "";

  // Loading Screen
  document.getElementById("loading-screen").style.display = "block";

  const engines = document.getElementsByName("summaryEngine");

  const selectedEngine = Array.from(engines).find(
    (engine) => engine.checked
  )?.value;

  const summaryCloseButton = document.querySelector(".home-button02");
  const summaryDiv = document.querySelector("#summaryDiv");

  summaryCloseButton.addEventListener("click", () => {
    summaryDiv.style.display = "none";
  });

  // Send a POST request to /summarize endpoint
  try {
    fetch("/summarize", {
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
            "The summary is: <br/><br/>" +
            data.summary +
            "<br/><br/> Powered by " +
            data.selectedEngine;
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("summaryDiv").style.display = "block";
        } else {
          resultDiv.innerHTML =
            "We are caught in the middle of an error. Please try Again!";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("summaryDiv").style.display = "block";
        }
      })
      .catch((error) => {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while summarizing the text");
        throw error; // add this line to throw the error
      });
  } catch (error) {
    document.getElementById("loading-screen").style.display = "none";
    alert("An error occurred while summarizing the text");
  }
}
