#Price Predictor using ARIMA Forecaster

##Purpose
This repository features a Price Predictor that leverages an ARIMA (AutoRegressive Integrated Moving Average) model to forecast product prices based on their price history over the past month. The primary goal is to provide users with insights into short-term fluctuations in product prices, aiding them in making informed decisions about the best time to make a purchase.

##Explanation of ARIMA
The model uses a standard ARIMA approach to capture short-term trends in product pricing. ARIMA combines autoregression (AR), differencing (I), and moving averages (MA) to create a robust forecasting tool. The result is a predictive model that can anticipate product prices for the next 7 days.

##Repository Structure
The repository is organized with two main components:

###server.js: This file is responsible for executing both script.py and script.js. Upon successful execution of script.py, a JSON file (arima_results.json) is generated. This file is then utilized by script.js to plot the price chart on the webpage using Charts.js.

###script.py: This Python script, upon successful build, creates the arima_results.json file, containing the predicted prices for the upcoming week.

###script.js: This JavaScript file is responsible for rendering the price chart on the webpage. Users can customize the chart's appearance and behavior by modifying this file. Note that to use this forecaster with a different CSV file, users need to update the data source in this script at line 10 to match the new dataset.

##Deployment
The deployed code can be accessed at: [here](https://price-predictor-k0u3.onrender.com/)

Feel free to explore the provided deployment link to see the Price Predictor in action and visualize the predicted product prices.

##Getting Started
To run the Price Predictor locally, follow these steps:

1.Clone the repository to your local machine.
2.Install any necessary dependencies.
3.Execute server.js to initiate the prediction process.
4. Make sure to refer to the documentation for further details on how to set up and customize the Price Predictor according to your requirements.

**Note**: To use this forecaster with any other CSV file, update the data source in script.js (line 10) and script.py (line 7) to match the new dataset.

Happy forecasting!
