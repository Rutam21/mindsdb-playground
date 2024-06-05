# MindsDB Playground

![Screenshot 2023-04-22 210754](https://user-images.githubusercontent.com/47860497/235336539-e4eb9405-b05e-449e-95be-6f17f7573cf7.png)

**Welcome to the **MindsDB Playground** repository! This project is a web application that leverages the power of MindsDB to perform various natural language processing (NLP) tasks, such as text summarization, sentiment analysis, translation, spam detection, and more. The app provides a user-friendly interface to interact with these functionalities, making it a versatile tool for text analysis and data predictions.**

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Demo

**You can access the live demo of the application here: [MindsDB Playground](https://mdbplay.co/)**

## Features

- **Text Summarization**: Generate concise summaries from input text.
- **Sentiment Analysis**: Determine the sentiment (positive, negative, neutral) of the text.
- **Translation**: Translate text between different languages.
- **Spam Detection**: Detect whether the input text is spam.
- **JSON Extraction**: Extract structured JSON data from unstructured text.
- **Q&A**: Answer questions based on the input text.
- **ESG Analysis**: Determine the ESG (Environmental, Social, Governance) type of the text.
- **Industry Classification**: Classify the industry type from the input text.
- **Mobile Price Prediction**: Predict mobile phone prices.
- **Ethereum Price Forecast**: Forecast Ethereum prices.
- **Water Quality Analysis**: Determine the potability of water.
- **Tesla Stock Prediction**: Predict Tesla stock prices.

## Installation

**To run the MindsDB Playground locally, follow these steps:**

1. **Clone the repository**:
2. 
   ```bash
   git clone https://github.com/Rutam21/mindsdb-playground.git
   cd mindsdb-playground
   ```

3. **Install dependencies**:
   Ensure you have [Node.js](https://nodejs.org/) installed, then run:
   
   ```bash
   npm install
   ```

5. **Set up environment variables**:

   Create a `.env` file in the root directory and add your environment variables based on the `.env.example` file. For example:
   
   ```env
   MINDSDB_API_KEY=your_mindsdb_api_key
   ...
   ...
   ...
   ```

7. **Run the application**:

   ```bash
   npm start
   ```
   
   The application will start on `http://localhost:3000`.

## Usage

**Open your browser and navigate to `http://localhost:3000`. You will see the home page of the MindsDB Playground where you can interact with various NLP tools provided by MindsDB.**

## API Endpoints

**The application provides several API endpoints for different NLP tasks. Below is a summary of the available endpoints, including the required input parameters and response formats:**

### 1. Summarize Text

**Endpoint**: `POST /summarize`

**Input**:
```json
{
  "inputText": "Text to summarize",
  "selectedEngine": "Engine to use"
}
```

**Response**:
```json
{
  "summary": "Generated summary",
  "selectedEngine": "Engine used"
}
```

### 2. Sentiment Analysis

**Endpoint**: `POST /analyze`

**Input**:
```json
{
  "inputText": "Text to analyze",
  "selectedEngine": "Engine to use"
}
```

**Response**:
```json
{
  "prediction": "Sentiment analysis result",
  "selectedEngine": "Engine used"
}
```

### 3. Translate Text

**Endpoint**: `POST /translate`

**Input**:
```json
{
  "inputText": "Text to translate",
  "selectedEngine": "Engine to use",
  "choice": "Language to translate to"
}
```

**Response**:
```json
{
  "translation": "Translated text",
  "selectedEngine": "Engine used"
}
```

### 4. Spam Detection

**Endpoint**: `POST /spam`

**Input**:
```json
{
  "inputText": "Text to check for spam",
  "selectedEngine": "Engine to use"
}
```

**Response**:
```json
{
  "status": "Spam status",
  "selectedEngine": "Engine used"
}
```

### 5. Extract JSON

**Endpoint**: `POST /json`

**Input**:
```json
{
  "inputText": "Text to extract JSON from",
  "selectedEngine": "Engine to use"
}
```

**Response**:
```json
{
  "json": "Extracted JSON",
  "selectedEngine": "Engine used"
}
```

### 6. Q&A

**Endpoint**: `POST /qna`

**Input**:
```json
{
  "inputText": "Text to generate questions and answers",
  "selectedEngine": "Engine to use"
}
```

**Response**:
```json
{
  "answer": "Generated answer",
  "selectedEngine": "Engine used"
}
```

### 7. ESG Analysis

**Endpoint**: `POST /esg`

**Input**:
```json
{
  "inputText": "Text to analyze for ESG",
  "selectedEngine": "Engine to use"
}
```

**Response**:
```json
{
  "esgType": "Determined ESG type",
  "selectedEngine": "Engine used"
}
```

### 8. Industry Classification

**Endpoint**: `POST /industry`

**Input**:
```json
{
  "inputText": "Text to classify industry",
  "selectedEngine": "Engine to use"
}
```

**Response**:
```json
{
  "industry": "Classified industry type",
  "selectedEngine": "Engine used"
}
```

### 9. Mobile Price Prediction

**Endpoint**: `POST /findPrice`

**Input**:
```json
{
  "inputText": "Text to predict mobile price",
  "selectedEngine": "Engine to use"
}
```

**Response**:
```json
{
  "price": "Predicted mobile price",
  "selectedEngine": "Engine used"
}
```

### 10. Ethereum Price Forecast

**Endpoint**: `POST /findEthPrice`

**Input**:
```json
{
  "inputText": "Text to forecast Ethereum price",
  "selectedEngine": "Engine to use"
}
```

**Response**:
```json
{
  "price": "Forecasted Ethereum price",
  "selectedEngine": "Engine used"
}
```

### 11. Water Quality Analysis

**Endpoint**: `POST /getQuality`

**Input**:
```json
{
  "inputText": "Text to analyze water quality",
  "selectedEngine": "Engine to use"
}
```

**Response**:
```json
{
  "potability": "Determined water potability",
  "selectedEngine": "Engine used"
}
```

### 12. Tesla Stock Prediction

**Endpoint**: `POST /findTeslaStocks`

**Input**:
```json
{
  "inputText": "Text to predict Tesla stock price",
  "selectedEngine": "Engine to use"
}
```

**Response**:
```json
{
  "stock": "Predicted Tesla stock price",
  "selectedEngine": "Engine used"
}
```

### 13. Download Instruction Cheat Sheet Files

**Endpoint**: `GET /download/:filename`

**Input Action**: Click on the ⬇️ button available in the top left corner of each section to download the instruction guide on how to train a MindsDB model for that particular section.

**Response**: The requested PDF file will be downloaded.

## Contributing

We welcome contributions to enhance the MindsDB Playground. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

Please ensure your contributions adhere to the coding standards and pass all tests.

## License

This project is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using the MindsDB Playground! If you have any questions or feedback, feel free to open an issue or contact us. Happy coding!

---
![MindsDB Banner](https://github.com/Rutam21/mindsdb-playground/assets/47860497/0fee2c4e-bb82-4fd1-b57f-942463bacdb8)
