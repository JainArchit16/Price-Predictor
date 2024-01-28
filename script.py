import numpy as np
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import json

# Read the dataset
dataset = pd.read_csv("lgMonitor.csv")
dataset['Date'] = pd.to_datetime(dataset['Date'])
dataset = dataset.sort_values(by='Date')

# Use the price column for training
data = dataset.set_index('Date')['Price']

# Fit ARIMA model
model = ARIMA(data, order=(5, 1, 3))  # Adjust order as needed
fit_model = model.fit()

# Forecast next 7 days
forecast = fit_model.get_forecast(steps=7)

# Find the date and price with the lowest forecasted price
min_price_index = forecast.predicted_mean.idxmin()
min_price = forecast.predicted_mean[min_price_index]

# Create a dictionary with relevant information
result_data = {
    'minPriceIndex': min_price_index.strftime('%Y-%m-%d'),
    'minPrice': float(min_price),
    'forecastedPrices': forecast.predicted_mean.tolist()
}

# Save the result as a JSON file
with open('arima_results.json', 'w') as file:
    json.dump(result_data, file)
