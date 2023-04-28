function handleEsg(event) {
  event.preventDefault();
  const inputText = document.getElementById("esgInput").value;
  const resultDiv = document.getElementById("esgResult");

  // Clear the input field
  document.getElementById("esgInput").value = "";

  // Loading Screen
  document.getElementById("loading-screen").style.display = "block";

  const engines = document.getElementsByName("esgEngine");

  const selectedEngine = Array.from(engines).find(
    (engine) => engine.checked
  )?.value;

  const esgCloseButton = document.querySelector(".home-button26");
  const esgDiv = document.querySelector("#esgDiv");

  esgCloseButton.addEventListener("click", () => {
    esgDiv.style.display = "none";
  });

  // Send a POST request to /qna endpoint
  try {
    fetch("/esg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputText, selectedEngine }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the answer
        if (!data.error) {
          resultDiv.innerHTML =
            "The ESG classification type of your text is:<br/><br/>" +
            data.esgType +
            "<br/><br/> Powered by " +
            data.selectedEngine;
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("esgDiv").style.display = "block";
        } else {
          resultDiv.innerHTML =
            "We are caught in the middle of an error. Please try Again!";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("esgDiv").style.display = "block";
        }
      })
      .catch((error) => {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while determining the ESG type");
        throw error; // add this line to throw the error
      });
  } catch (error) {
    document.getElementById("loading-screen").style.display = "none";
    alert("An error occurred while determining the ESG type");
  }
}
