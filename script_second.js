const  fetchDataBtn = document.getElementById('fetch-data');

const fetchData = (url) => {
    console.log('Fetching data ---')
    fetchStockData(url)

}

async function fetchStockData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

    } catch (error) {
        console.error('There was an error fetching the data', error);
        alert('Error fetching stock data. Please check the console for more details.');
    }
};

const url = 'https://pokeapi.co/api/v2/pokemon/ditto';

fetchDataBtn.addEventListener('click', () => {
    console.log('button clicked');
    fetchData(url);
});