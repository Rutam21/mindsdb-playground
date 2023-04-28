function handleStockPrices(event) {
  event.preventDefault();
  const date = document.getElementById("teslaInput").value;
  const resultDiv = document.getElementById("teslaResult");

  // Clear the input field
  document.getElementById("teslaInput").value = "";

  // Loading Screen
  document.getElementById("loading-screen").style.display = "block";

  const teslaCloseButton = document.querySelector(".home-button24");
  const teslaDiv = document.querySelector("#teslaDiv");

  teslaCloseButton.addEventListener("click", () => {
    teslaDiv.style.display = "none";
  });

  // Send a POST request to /predict endpoint
  try {
    fetch("/findTeslaStocks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the prediction
        if (!data.error) {
          resultDiv.innerHTML =
            "The Forecasted Close Price of Tesla Stock on the next day of " +
            date +
            " is:<br/><br/>" +
            data.stock +
            "$";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("teslaDiv").style.display = "block";
        } else {
          resultDiv.innerHTML =
            "We are caught in the middle of an error. Please try Again!";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("teslaDiv").style.display = "block";
        }
      })
      .catch((error) => {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while finding Tesla stock price");
        throw error; // add this line to throw the error
      });
  } catch (error) {
    document.getElementById("loading-screen").style.display = "none";
    alert("An error occurred while finding Tesla stock price");
  }
}
