function handleSpam(event) {
  event.preventDefault();
  const inputText = document.getElementById("spamInput").value;
  const resultDiv = document.getElementById("spamResult");

  // Clear the input field
  document.getElementById("spamInput").value = "";

  // Loading Screen
  document.getElementById("loading-screen").style.display = "block";

  const engines = document.getElementsByName("spamEngine");

  const selectedEngine = Array.from(engines).find(
    (engine) => engine.checked
  )?.value;

  const spamCloseButton = document.querySelector(".home-button08");
  const spamDiv = document.querySelector("#spamDiv");

  spamCloseButton.addEventListener("click", () => {
    spamDiv.style.display = "none";
  });

  // Send a POST request to /spam endpoint
  try {
    fetch("/spam", {
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
            "The given text is: <br/><br/>" +
            data.status +
            "<br/><br/> Powered by " +
            data.selectedEngine;
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("spamDiv").style.display = "block";
        } else {
          resultDiv.innerHTML =
            "We are caught in the middle of an error. Please try Again!";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("spamDiv").style.display = "block";
        }
      })
      .catch((error) => {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while analyzing the text");
        throw error;
      });
  } catch (error) {
    document.getElementById("loading-screen").style.display = "none";
    alert("An error occurred while analyzing the text");
  }
}
