const fetchDataBtn = document.getElementById('fetch-data');
const chartCanvas = document.getElementById('chart-canvas')

const runFetch = () => {
    const stockCode = document.getElementById('stock-code').value;
    console.log('stockCode ---> ', stockCode);
    const dateFrom = document.getElementById('date-from').value;
    console.log('dateFrom ---> ', dateFrom);
    const dateTo = document.getElementById('date-to').value;
    console.log('dateTo ---> ', dateTo);

    const dateArray = generateDateArray(dateFrom, dateTo);

    console.log(dateArray);

    if (stockCode && dateFrom && dateTo) {
        fetchStockData(stockCode, dateFrom, dateTo, dateArray);
    } else {
        alert('Please fill all fields and select at least one metric.');
    };
};

function generateDateArray(startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let dateArray = [];

    while (start <= end) {
        const dayOfWeek = start.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude Sundays (0) and Saturdays (6)
            dateArray.push(new Date(start));
        }
        start.setDate(start.getDate() + 1);
    }

    return dateArray;
};



async function fetchStockData(stockCode, dateFrom, dateTo, dateArray) {
    const apiKey = 'zis_z1ntNODTYesUHr68jbd5pvSXTYqY';
    const url = `https://api.polygon.io/v2/aggs/ticker/${stockCode}/range/1/day/${dateFrom}/${dateTo}?apiKey=${apiKey}`;
    console.log(url);
    try {
        const response = await fetch(url);
        console.log(response);

        const data = await response.json();
        console.log(data.results);
        console.log(dateArray)

        if (data.results) {
            renderChart(data.results, dateArray);
        } else {
            alert('No data found for the given stock and date range.');
        }
        
    } catch (error) {
        console.error('Error fetching stock data:', error);
        alert('Error fetching stock data. Please check the console for more details.');
    }
};

fetchDataBtn.addEventListener('click', runFetch);


const renderChart = (data, dates) => {
    console.log('inside renderChart function')
    const openPrice = data.map((element) => element.o);
    Plotly.newPlot( chartCanvas, [{
        x: dates,
        y: openPrice }], {
        margin: { t: 0 } } );
}
