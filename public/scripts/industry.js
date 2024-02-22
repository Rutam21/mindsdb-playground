function handleIndustry(event) {
  event.preventDefault();
  const inputText = document.getElementById("industryInput").value;
  const resultDiv = document.getElementById("industryResult");

  // Clear the input field
  document.getElementById("industryInput").value = "";

  // Loading Screen
  document.getElementById("loading-screen").style.display = "block";

  const engines = document.getElementsByName("industryEngine");

  const selectedEngine = Array.from(engines).find(
    (engine) => engine.checked
  )?.value;

  const industryCloseButton = document.querySelector(".home-button25");
  const industryDiv = document.querySelector("#industryDiv");

  industryCloseButton.addEventListener("click", () => {
    industryDiv.style.display = "none";
  });

  // Send a POST request to /qna endpoint
  try {
    fetch("/industry", {
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
            "The Industry type of your text is:<br/><br/>" +
            data.industry +
            "<br/><br/>Powered by " +
            data.selectedEngine;
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("industryDiv").style.display = "block";
        } else {
          resultDiv.innerHTML =
            "We are caught in the middle of an error. Please try Again!";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("industryDiv").style.display = "block";
        }
      })
      .catch((error) => {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while determining the Industry type");
        throw error; // add this line to throw the error
      });
  } catch (error) {
    document.getElementById("loading-screen").style.display = "none";
    alert("An error occurred while determining the Industry type");
  }
}
