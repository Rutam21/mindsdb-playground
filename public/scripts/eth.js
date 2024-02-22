function handleEthPrices(event) {
  event.preventDefault();
  const date = document.getElementById("ethInput").value;
  const resultDiv = document.getElementById("ethResult");

  // Clear the input field
  document.getElementById("ethInput").value = "";

  // Loading Screen
  document.getElementById("loading-screen").style.display = "block";

  const ethCloseButton = document.querySelector(".home-button18");
  const ethDiv = document.querySelector("#ethDiv");

  ethCloseButton.addEventListener("click", () => {
    ethDiv.style.display = "none";
  });

  // Send a POST request to /predict endpoint
  try {
    fetch("/findEthPrice", {
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
            "The Forecasted Close Price of Ethereum on the next day of " +
            date +
            " is:<br/><br/>" +
            data.price +
            "$";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("ethDiv").style.display = "block";
        } else {
          resultDiv.innerHTML =
            "We are caught in the middle of an error. Please try Again!";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("ethDiv").style.display = "block";
        }
      })
      .catch((error) => {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while finding ETH price");
        throw error; // add this line to throw the error
      });
  } catch (error) {
    document.getElementById("loading-screen").style.display = "none";
    alert("An error occurred while finding ETH price");
  }
}
