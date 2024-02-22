function handleQNA(event) {
  event.preventDefault();
  const inputText = document.getElementById("questionInput").value;
  const resultDiv = document.getElementById("qnaResult");

  // Clear the input field
  document.getElementById("questionInput").value = "";

  // Loading Screen
  document.getElementById("loading-screen").style.display = "block";

  const engines = document.getElementsByName("qnaEngine");

  const selectedEngine = Array.from(engines).find(
    (engine) => engine.checked
  )?.value;

  const qnaCloseButton = document.querySelector(".home-button12");
  const qnaDiv = document.querySelector("#qnaDiv");

  qnaCloseButton.addEventListener("click", () => {
    qnaDiv.style.display = "none";
  });

  // Send a POST request to /qna endpoint
  try {
    fetch("/qna", {
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
            "Here is your answer:<br/><br/>" +
            data.answer +
            "<br/><br/> Powered by " +
            data.selectedEngine;
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("qnaDiv").style.display = "block";
        } else {
          resultDiv.innerHTML =
            "We are caught in the middle of an error. Please try Again!";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("qnaDiv").style.display = "block";
        }
      })
      .catch((error) => {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while finding the answer");
        throw error; // add this line to throw the error
      });
  } catch (error) {
    document.getElementById("loading-screen").style.display = "none";
    alert("An error occurred while finding the answer");
  }
}
