//Imports
import algoliasearch from "algoliasearch";
import algoliasearchHelper from "algoliasearch-helper";
import { renderHits, renderPaymentFacets, renderFoodFacets, renderRatingStars} from './lib/renderFunctions';

//Project Variables
//Algolia Variables
const APP_ID = "KO745I5TAW";
const SEARCH_ONLY_API_KEY = "5a7608529601ef0295f8947d071ce949";
const INDEX = 'Restaurants';

//Initialise Algolia
const client = algoliasearch(APP_ID, SEARCH_ONLY_API_KEY);
const helper = algoliasearchHelper(client, INDEX, {
  facets: ['food_type', 'payment_options'],
  maxValuesPerFacet: 10
});

// HTML Elements
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const paymentContainer = document.getElementById('payment-conatiner');
const foodContainer = document.getElementById('food-type-container');
const starContainer = document.getElementById('star-rating-container');
const resultsHits = document.getElementById('results-hits');
const responseTime = document.getElementById('response-time');

//construct query
document.addEventListener('keyup', function (e) {
  e.preventDefault();
  helper.setQuery(searchInput.value).search();
  resultRender();
});

//Render Data to WebPage
helper.setQuery('').search();
resultRender();




//function co
function resultRender() {
  helper.on('result', function (event) {
    if (event.results.hits.length === 0) {
      resultsHits.innerHTML = '0';
      responseTime.innerHTML = (event.results.processingTimeMS) / 1000;
      resultsContainer.innerHTML = 'No Results Found';
      paymentContainer.innerHTML = 'No Payment Options Found';
      foodContainer.innerHTML = 'No Food Options Found';
      starContainer.innerHTML = 'No Ratings Found';
      return;
    }
    resultsHits.innerHTML = event.results.nbHits;
    responseTime.innerHTML = (event.results.processingTimeMS) / 1000;
    renderHits(event, resultsContainer);
    renderPaymentFacets(event, paymentContainer);
    renderFoodFacets(event, foodContainer);
    renderRatingStars(starContainer);

  });
  helper.on('error', (error) => {
    console.error('Algolia Search Error:', error);
  });
}



