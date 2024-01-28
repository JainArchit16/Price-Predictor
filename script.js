// Fetch data from the JSON file
fetch("arima_results.json")
  .then((response) => response.json())
  .then((data) => {
    const forecastedPrices = data.forecastedPrices;
    const minPriceIndex = data.minPriceIndex;
    const minPrice = data.minPrice;

    // Fetch data from the CSV file
    fetch("lgMonitor.csv") // Replace 'lgMonitor.csv' with your actual CSV file name
      .then((response) => response.text())
      .then((csvData) => {
        // Parse CSV data
        const rows = csvData.split("\n");
        const headers = rows[0].split(",");

        // Find the index of the 'Date' and 'Price' columns
        const dateIndex = headers.indexOf("Date");
        const priceIndex = headers.indexOf("Price");

        // Extract date labels and actual prices
        const dateLabels = [];
        const actualPrices = [];

        for (let i = 1; i < rows.length; i++) {
          const cols = rows[i].split(",");
          dateLabels.push(cols[dateIndex]);
          actualPrices.push(parseFloat(cols[priceIndex]));
        }

        const lastActualDate = new Date(dateLabels[dateLabels.length - 2]);

        const nextDates = Array.from({ length: 7 }, (_, i) => {
          const currentDate = new Date(lastActualDate);
          currentDate.setDate(currentDate.getDate() + i + 1);
          return currentDate.toLocaleDateString("en-US");
        });

        // Continue with the rest of your code
        const ctx = document.getElementById("myChart").getContext("2d");
        const myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: [...dateLabels, ...nextDates],
            datasets: [
              {
                label: "Actual Prices",
                data: [...actualPrices, ...Array(7).fill(null)],
                borderColor: "blue",
                fill: false,
              },
              {
                label: "ARIMA Forecast",
                data: [
                  ...Array(dateLabels.length - 2).fill(null),
                  ...forecastedPrices,
                ],
                borderColor: "green",
                fill: false,
              },
            ],
          },
        });

        // Highlight the minimum forecasted price
        const point = myChart.getDatasetMeta(1).data[minPriceIndex];
        point.custom = { radius: 6, backgroundColor: "red" };

        // Update the chart
        myChart.update();

        // Display the minimum forecasted price information
        alert(
          `Minimum Forecasted Price\nDate: ${minPriceIndex}\nPrice: ${minPrice}`
        );
      })
      .catch((error) => console.error("Error fetching CSV data:", error));
  })
  .catch((error) => console.error("Error fetching JSON data:", error));
