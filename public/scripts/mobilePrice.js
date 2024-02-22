function handleMobilePrice(event) {
  event.preventDefault();
  const model = document.getElementById("model").value;
  const brand = document.getElementById("brand").value;
  const storage = document.getElementById("storage").value;
  const ram = document.getElementById("ram").value;
  const screen = document.getElementById("screen").value;
  const battery = document.getElementById("battery").value;
  const camera = document.getElementById("camera").value;
  const resultDiv = document.getElementById("mobileResult");

  // Clear the input field
  document.getElementById("model").value = "";
  document.getElementById("brand").value = "";
  document.getElementById("storage").value = "";
  document.getElementById("ram").value = "";
  document.getElementById("screen").value = "";
  document.getElementById("battery").value = "";
  document.getElementById("camera").value = "";

  // Loading Screen
  document.getElementById("loading-screen").style.display = "block";

  const mobileCloseButton = document.querySelector(".home-button15");
  const mobileDiv = document.querySelector("#mobileDiv");

  mobileCloseButton.addEventListener("click", () => {
    mobileDiv.style.display = "none";
  });

  // Send a POST request to /predict endpoint
  try {
    fetch("/findPrice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        brand,
        storage,
        ram,
        screen,
        battery,
        camera,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the prediction
        if (!data.error) {
          resultDiv.innerHTML =
            "The Price for a mobile with the above specs is:<br/><br/>" +
            data.price +
            "$";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("mobileDiv").style.display = "block";
        } else {
          resultDiv.innerHTML =
            "We are caught in the middle of an error. Please try Again!";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("mobileDiv").style.display = "block";
        }
      })
      .catch((error) => {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while finding mobile price");
        throw error; // add this line to throw the error
      });
  } catch (error) {
    document.getElementById("loading-screen").style.display = "none";
    alert("An error occurred while finding mobile price");
  }
}
