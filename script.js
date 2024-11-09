const fetchDataBtn = document.getElementById('fetch-data');

const runFetch = () => {
    const stockCode = document.getElementById('stock-code').value;
    console.log('stockCode ---> ', stockCode);
    const dateFrom = document.getElementById('date-from').value;
    console.log('dateFrom ---> ', dateFrom);
    const dateTo = document.getElementById('date-to').value;
    console.log('dateTp ---> ', dateTo);
    const metrics = Array.from(document.getElementById('metrics').selectedOptions).map(option => option.value);
    console.log('metrics ---> ', metrics);

    if (stockCode && dateFrom && dateTo && metrics.length > 0) {
        fetchStockData(stockCode, dateFrom, dateTo, metrics);
    } else {
        alert('Please fill all fields and select at least one metric.');
    }
};


fetchDataBtn.addEventListener('click', runFetch);
    


async function fetchStockData(stockCode, dateFrom, dateTo, metrics) {
    const apiKey = 'zis_z1ntNODTYesUHr68jbd5pvSXTYqY';
    const url = `https://api.polygon.io/v2/aggs/ticker/${stockCode}/range/1/day/${dateFrom}/${dateTo}?apiKey=${apiKey}`;
    console.log(url);
    try {
        const response = await fetch(url);
        console.log(response)

        const data = await response.json();
        console.log(data)

        if (data.results) {
            renderChart(data.results, metrics);
        } else {
            alert('No data found for the given stock and date range.');
        }
        
    } catch (error) {
        console.error('Error fetching stock data:', error);
        alert('Error fetching stock data. Please check the console for more details.');
    }
};

/* <-----------------------UNNECESSARY FOR NOW---------------------------------->
function renderChart(data, metrics) {
    const ctx = document.getElementById('stockChart').getContext('2d');
    const labels = data.map(item => new Date(item.t).toLocaleDateString());
    const datasets = metrics.map(metric => ({
        label: metric,
        data: data.map(item => item[metric]),
        borderColor: getRandomColor(),
        fill: false
    }));

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                },
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
*/