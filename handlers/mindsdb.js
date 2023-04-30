const MindsDB = require("mindsdb-js-sdk").default;
const priceModelName = process.env.MINDSDB_MOBILE_MODEL_NAME;
const teslaModelName = process.env.MINDSDB_TESLA_MODEL_NAME;
const ethModelName = process.env.MINDSDB_ETH_MODEL_NAME;
const waterModelName = process.env.MINDSDB_WATER_MODEL_NAME;
const logger = require("../logger");

let sentimentModelName = null;
let summaryModelName = null;
let translationModelName = null;
let spamModelName = null;
let jsonModelName = null;
let esgModelName = null;
let industryModelName = null;

async function connectToMindsDB() {
  try {
    await MindsDB.connect({
      user: process.env.MINDSDB_USERNAME,
      password: process.env.MINDSDB_PASSWORD,
    });
    logger.info("Connected to MindsDB Cloud");
  } catch (error) {
    logger.error("Error connecting to MindsDB Cloud:", error);
    throw error;
  }
}

async function analyzeSentiment(inputText, selectedEngine) {
  let retries = 3; // Maximum number of retries

  if (selectedEngine === "OpenAI") {
    sentimentModelName = process.env.MINDSDB_OA_SENTIMENT_MODEL_NAME;
  } else if (selectedEngine === "HuggingFace") {
    sentimentModelName = process.env.MINDSDB_HF_SENTIMENT_MODEL_NAME;
  }

  while (retries > 0) {
    try {
      const escapedMessage = inputText.replace(/"/g, "");
      const text = `SELECT sentiment FROM ${sentimentModelName} WHERE text="${escapedMessage}"`;
      const sentimentResponse = await MindsDB.SQL.runQuery(text);
      if (!sentimentResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return (
        "The sentiment of the above text is " +
        sentimentResponse.rows[0].sentiment +
        "."
      );
    } catch (error) {
      logger.error("Error analyzing sentiment:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function extractSummary(message, selectedEngine) {
  let retries = 3; // Maximum number of retries
  if (selectedEngine === "OpenAI") {
    summaryModelName = process.env.MINDSDB_OA_SUMMARY_MODEL_NAME;
  } else if (selectedEngine === "HuggingFace") {
    summaryModelName = process.env.MINDSDB_HF_SUMMARY_MODEL_NAME;
  }

  while (retries > 0) {
    try {
      const escapedMessage = message.replace(/"/g, ""); // Escape double quotes
      const text = `SELECT summary FROM ${summaryModelName} WHERE text="${escapedMessage}"`; // use escaped message
      const summaryResponse = await MindsDB.SQL.runQuery(text);
      if (!summaryResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return summaryResponse.rows[0].summary;
    } catch (error) {
      logger.error("Error extracting summary:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function detectSpam(message, selectedEngine) {
  let retries = 3; // Maximum number of retries
  if (selectedEngine === "OpenAI") {
    spamModelName = process.env.MINDSDB_OA_SPAM_MODEL_NAME;
  } else if (selectedEngine === "HuggingFace") {
    spamModelName = process.env.MINDSDB_HF_SPAM_MODEL_NAME;
  }

  while (retries > 0) {
    try {
      const escapedMessage = message.replace(/"/g, "");
      const text = `SELECT type FROM ${spamModelName} WHERE text="${escapedMessage}"`; // use escaped message
      const spamResponse = await MindsDB.SQL.runQuery(text);
      if (!spamResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return spamResponse.rows[0].type;
    } catch (error) {
      logger.error("Error determining the text category:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function extractJson(message, selectedEngine) {
  let retries = 3; // Maximum number of retries
  if (selectedEngine === "OpenAI") {
    jsonModelName = process.env.MINDSDB_OA_JSON_MODEL_NAME;
  }

  while (retries > 0) {
    try {
      const escapedMessage = message.replace(/"/g, "");
      const text = `SELECT json FROM ${jsonModelName} WHERE synopsis="${escapedMessage}"`;
      const jsonResponse = await MindsDB.SQL.runQuery(text);
      if (!jsonResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return jsonResponse.rows[0].json;
    } catch (error) {
      logger.error("Error fetching the JSON from text:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function fetchAnswers(message, selectedEngine) {
  let retries = 3; // Maximum number of retries
  if (selectedEngine === "OpenAI") {
    qnaModelName = process.env.MINDSDB_OA_QNA_MODEL_NAME;
  }

  while (retries > 0) {
    try {
      const escapedMessage = message.replace(/"/g, "");
      const text = `SELECT answer FROM ${qnaModelName} WHERE question="${escapedMessage}"`;
      const qnaResponse = await MindsDB.SQL.runQuery(text);
      if (!qnaResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return qnaResponse.rows[0].answer;
    } catch (error) {
      logger.error("Error fetching the answer:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function determineESG(message, selectedEngine) {
  let retries = 3; // Maximum number of retries
  if (selectedEngine === "HuggingFace") {
    esgModelName = process.env.MINDSDB_HF_ESG_MODEL_NAME;
  }

  while (retries > 0) {
    try {
      const escapedMessage = message.replace(/"/g, "");
      const text = `SELECT label FROM ${esgModelName} WHERE text="${escapedMessage}"`;
      const esgResponse = await MindsDB.SQL.runQuery(text);
      if (!esgResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return esgResponse.rows[0].label;
    } catch (error) {
      logger.error("Error determining ESG label for text:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function determineIndustry(message, selectedEngine) {
  let retries = 3; // Maximum number of retries
  if (selectedEngine === "HuggingFace") {
    industryModelName = process.env.MINDSDB_HF_INDUSTRY_MODEL_NAME;
  }

  while (retries > 0) {
    try {
      const escapedMessage = message.replace(/"/g, "");
      const text = `SELECT label FROM ${industryModelName} WHERE text="${escapedMessage}"`;
      const industryResponse = await MindsDB.SQL.runQuery(text);
      if (!industryResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return industryResponse.rows[0].label;
    } catch (error) {
      logger.error("Error determining Industry label for text:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function handleMobilePrice(request) {
  let retries = 3; // Maximum number of retries

  while (retries > 0) {
    try {
      const brand = request.body.brand.replace(/"/g, "");
      const model = request.body.model.replace(/"/g, "");
      const text = `Select Price from ${priceModelName} where Brand="${brand}" AND Model="${model}" AND Storage=${request.body.storage} AND RAM=${request.body.ram} AND ScreenSize=${request.body.screen} AND BatteryCapacity=${request.body.battery} AND Camera=${request.body.camera};`;
      const priceResponse = await MindsDB.SQL.runQuery(text);
      if (!priceResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return priceResponse.rows[0].price;
    } catch (error) {
      logger.error("Error predicting mobile phone price:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function forecastEthPrice(request) {
  let retries = 3; // Maximum number of retries

  while (retries > 0) {
    try {
      const text = `Select EP.Close from ${ethModelName} as EP JOIN files.Ethereum as E WHERE E.Date > '${request.body.date}' LIMIT 1;`;
      const ethPriceResponse = await MindsDB.SQL.runQuery(text);
      if (!ethPriceResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return ethPriceResponse.rows[0].close;
    } catch (error) {
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function getWaterQuality(request) {
  let retries = 3; // Maximum number of retries

  while (retries > 0) {
    try {
      const text = `Select Potability from ${waterModelName} where ph='${request.body.ph}' AND Hardness='${request.body.hardness}' AND Solids=${request.body.solids} AND Chloramines=${request.body.chloramines} AND Sulfate=${request.body.sulfate} AND Conductivity=${request.body.conductivity} AND Organic_carbon=${request.body.carbon} AND Trihalomethanes=${request.body.trihalomethanes} AND Turbidity=${request.body.turbidity};`;
      const waterResponse = await MindsDB.SQL.runQuery(text);
      if (!waterResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return waterResponse.rows[0].potability;
    } catch (error) {
      logger.error("Error finding the water quality:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function handleTeslaStock(req) {
  let retries = 3; // Maximum number of retries

  while (retries > 0) {
    try {
      const text = `Select TP.Close from ${teslaModelName} as TP JOIN files.Tesla as T WHERE T.Date > '${req.body.date}' LIMIT 1;`;
      const priceResponse = await MindsDB.SQL.runQuery(text);
      if (!priceResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return priceResponse.rows[0].close;
    } catch (error) {
      logger.error("Error forecasting Tesla stock prices:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function translateText(inputText, selectedEngine, choice) {
  let retries = 3; // Maximum number of retries

  if (selectedEngine === "OpenAI") {
    if (choice === "Fr-EN") {
      translationModelName = process.env.MINDSDB_OA_FREN_MODEL_NAME;
    } else if (choice === "Es-EN") {
      translationModelName = process.env.MINDSDB_OA_ESEN_MODEL_NAME;
    } else {
      translationModelName = process.env.MINDSDB_OA_ENFR_MODEL_NAME;
    }
  } else if (selectedEngine === "HuggingFace") {
    if (choice === "Fr-EN") {
      translationModelName = process.env.MINDSDB_HF_FREN_MODEL_NAME;
    } else if (choice === "Es-EN") {
      translationModelName = process.env.MINDSDB_HF_ESEN_MODEL_NAME;
    } else {
      translationModelName = process.env.MINDSDB_HF_ENFR_MODEL_NAME;
    }
  }

  while (retries > 0) {
    try {
      const escapedMessage = inputText.replace(/"/g, "");
      const text = `SELECT translation FROM ${translationModelName} WHERE text="${escapedMessage}"`;
      const translationResponse = await MindsDB.SQL.runQuery(text);
      if (!translationResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return translationResponse.rows[0].translation;
    } catch (error) {
      logger.error("Error translating text:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

module.exports = {
  connectToMindsDB,
  analyzeSentiment,
  extractSummary,
  handleMobilePrice,
  handleTeslaStock,
  translateText,
  detectSpam,
  extractJson,
  fetchAnswers,
  forecastEthPrice,
  getWaterQuality,
  determineESG,
  determineIndustry,
};
