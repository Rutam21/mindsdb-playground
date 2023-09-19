function handleWaterQuality(event) {
  event.preventDefault();
  const ph = document.getElementById("ph").value;
  const hardness = document.getElementById("hardness").value;
  const solids = document.getElementById("solids").value;
  const chloramines = document.getElementById("chloramines").value;
  const sulfate = document.getElementById("sulfate").value;
  const conductivity = document.getElementById("conductivity").value;
  const carbon = document.getElementById("carbon").value;
  const trihalomethanes = document.getElementById("trihalomethanes").value;
  const turbidity = document.getElementById("turbidity").value;
  const resultDiv = document.getElementById("waterResult");

  // Clear the input field
  document.getElementById("ph").value = "";
  document.getElementById("hardness").value = "";
  document.getElementById("solids").value = "";
  document.getElementById("chloramines").value = "";
  document.getElementById("sulfate").value = "";
  document.getElementById("conductivity").value = "";
  document.getElementById("carbon").value = "";
  document.getElementById("trihalomethanes").value = "";
  document.getElementById("turbidity").value = "";

  // Loading Screen
  document.getElementById("loading-screen").style.display = "block";

  const waterCloseButton = document.querySelector(".home-result08");
  const waterDiv = document.querySelector("#waterDiv");

  waterCloseButton.addEventListener("click", () => {
    waterDiv.style.display = "none";
  });

  // Send a POST request to /getQuality endpoint
  try {
    fetch("/getQuality", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ph,
        hardness,
        solids,
        chloramines,
        sulfate,
        conductivity,
        carbon,
        trihalomethanes,
        turbidity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the prediction
        if (!data.error) {
          if (data.potability === "1.0" || data.potability === 1) {
            resultDiv.innerHTML =
              "The Water is Potable. <br/><br/>" +
              "<b>Potability:</b> " +
              data.potability;
          } else {
            resultDiv.innerHTML =
              "The Water is not Potable. <br/><br/>" +
              "<b>Potability:</b> " +
              data.potability;
          }
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("waterDiv").style.display = "block";
        } else {
          resultDiv.innerHTML =
            "We are caught in the middle of an error. Please try Again!";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("waterDiv").style.display = "block";
        }
      })
      .catch((error) => {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while finding water quality");
        throw error; // add this line to throw the error
      });
  } catch (error) {
    document.getElementById("loading-screen").style.display = "none";
    alert("An error occurred while finding water quality");
  }
}
