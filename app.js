require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mindsdb = require("./handlers/mindsdb");
const logger = require("./logger");

const app = express();

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the static files in public directory
app.use(express.static("public"));
app.use("/scripts", express.static(__dirname + "/scripts"));

// Connect to MindsDB and start the server when connection is established
mindsdb
  .connectToMindsDB()
  .then(() => {
    app.listen(3000, () => {
      logger.info("Server listening on port 3000");
    });
  })
  .catch((err) => {
    logger.error("Error connecting to MindsDB: ", err);
  });

// Route for the homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/summarize", async (req, res) => {
  const inputText = req.body.inputText;
  const selectedEngine = req.body.selectedEngine;

  try {
    // Call a function from mindsdb.js
    const summary = await mindsdb.extractSummary(inputText, selectedEngine);
    res.send({ summary, selectedEngine });
  } catch (error) {
    logger.error("Error extracting summary: ", error);
    res
      .status(500)
      .send({ error: "An error occurred while extracting summary." });
  }
});

app.post("/analyze", async (req, res) => {
  const inputText = req.body.inputText;
  const selectedEngine = req.body.selectedEngine;
  try {
    // Call a function from mindsdb.js
    const prediction = await mindsdb.analyzeSentiment(
      inputText,
      selectedEngine
    );
    res.send({ prediction, selectedEngine });
  } catch (error) {
    logger.error("Error analyzing sentiment: ", error);
    res
      .status(500)
      .send({ error: "An error occurred while analyzing sentiment" });
  }
});

app.post("/translate", async (req, res) => {
  const inputText = req.body.inputText;
  const selectedEngine = req.body.selectedEngine;
  const choice = req.body.choice;
  try {
    // Call a function from mindsdb.js
    const translation = await mindsdb.translateText(
      inputText,
      selectedEngine,
      choice
    );
    res.send({ translation, selectedEngine });
  } catch (error) {
    logger.error("Error translating text: ", error);
    res
      .status(500)
      .send({ error: "An error occurred while translating the text." });
  }
});

// Route to handle the prediction
app.post("/spam", async (req, res) => {
  const inputText = req.body.inputText;
  const selectedEngine = req.body.selectedEngine;
  try {
    // Call a function from mindsdb.js
    const status = await mindsdb.detectSpam(inputText, selectedEngine);
    res.send({ status, selectedEngine });
  } catch (error) {
    logger.error("Error detecting spam: ", error);
    res.status(500).send({ error: "An error occurred while detecting spam." });
  }
});

app.post("/json", async (req, res) => {
  const inputText = req.body.inputText;
  const selectedEngine = req.body.selectedEngine;
  try {
    // Call a function from mindsdb.js
    const json = await mindsdb.extractJson(inputText, selectedEngine);
    res.send({ json, selectedEngine });
  } catch (error) {
    logger.error("Error extracting JSON: ", error);
    res.status(500).send({ error: "An error occurred while extracting JSON." });
  }
});

app.post("/qna", async (req, res) => {
  const inputText = req.body.inputText;
  const selectedEngine = req.body.selectedEngine;
  try {
    // Call a function from mindsdb.js
    const answer = await mindsdb.fetchAnswers(inputText, selectedEngine);
    res.send({ answer, selectedEngine });
  } catch (error) {
    logger.error("Error fetching answer: ", error);
    res.status(500).send({ error: "An error occurred while fetching answer." });
  }
});

app.post("/esg", async (req, res) => {
  const inputText = req.body.inputText;
  const selectedEngine = req.body.selectedEngine;
  try {
    // Call a function from mindsdb.js
    const esgType = await mindsdb.determineESG(inputText, selectedEngine);
    res.send({ esgType, selectedEngine });
  } catch (error) {
    logger.error("Error determining ESG type: ", error);
    res
      .status(500)
      .send({ error: "An error occurred while determining ESG type." });
  }
});

app.post("/industry", async (req, res) => {
  const inputText = req.body.inputText;
  const selectedEngine = req.body.selectedEngine;
  try {
    // Call a function from mindsdb.js
    const industry = await mindsdb.determineIndustry(inputText, selectedEngine);
    res.send({ industry, selectedEngine });
  } catch (error) {
    logger.error("Error determining Industry type: ", error);
    res
      .status(500)
      .send({ error: "An error occurred while determining Industry type." });
  }
});

app.post("/findPrice", async (req, res) => {
  try {
    // Call a function from mindsdb.js
    const price = await mindsdb.handleMobilePrice(req);
    res.send({ price });
  } catch (error) {
    logger.error("Error finding Mobile Price: ", error);
    res
      .status(500)
      .send({ error: "An error occurred while finding Mobile price." });
  }
});

app.post("/findEthPrice", async (req, res) => {
  try {
    // Call a function from mindsdb.js
    const price = await mindsdb.forecastEthPrice(req);

    res.send({ price });
  } catch (error) {
    logger.error("Error finding ETHEREUM price: ", error);
    res
      .status(500)
      .send({ error: "An error occurred while finding ETHEREUM price." });
  }
});

app.post("/getQuality", async (req, res) => {
  try {
    // Call a function from mindsdb.js
    const potability = await mindsdb.getWaterQuality(req);
    res.send({ potability });
  } catch (error) {
    logger.error("Error finding water potability: ", error);
    res
      .status(500)
      .send({ error: "An error occurred while finding water potability." });
  }
});

app.post("/findTeslaStocks", async (req, res) => {
  try {
    // Call a function from mindsdb.js
    const stock = await mindsdb.handleTeslaStock(req);
    res.send({ stock });
  } catch (error) {
    logger.error("Error finding Tesla Stock Price: ", error);
    res
      .status(500)
      .send({ error: "An error occurred while finding Tesla Stock price." });
  }
});

//Download Cheat Sheet Files
app.get("/download/:filename", function (req, res) {
  var filename = req.params.filename;
  var file = __dirname + "/docs/" + filename + ".pdf";
  res.download(file); // Set disposition and send it.
});
