
//Function to Create Number of Stars -
function renderStars(rating) {
  let starContainer = '';
  const numberOfStars = Math.floor(rating);
  for (let i = 0; i < numberOfStars; i++) {
      starContainer += '<span class="star">&#9733;</span>'; // Full star
  }
  return starContainer;
}


//Render ResultsHits records
function renderHits(content, htmlContainer) {
    //htmlContainer.innerHTML = '';
    for(const hit in content.results.hits) {
      htmlContainer.innerHTML +=
      `
      <br>
      <div class="row">
       <div class="col-md-1">
         <img src="${content.results.hits[hit].image_url}" class="img-fluid" alt="Image of ${content.results.hits[hit].name}">
       </div>
       <div class="col-md-7">
         <div class="card-body">
           <h5 class="card-title">${content.results.hits[hit].name}</h5>
           <div class="card-text">
              <span class="rating">${content.results.hits[hit].stars_count}</span>
             ${renderStars(content.results.hits[hit].stars_count)}
             <span class="review-number">(${content.results.hits[hit].reviews_count})</span>
           </div>
           <p class="card-text result-info">
           ${content.results.hits[hit].food_type} 
           | 
           ${content.results.hits[hit].neighborhood}
           | 
           ${content.results.hits[hit].price_range}
           </p>
         </div>
       </div>
       <div class="col-md-2 d-flex align-items-center">
            <a href="${content.results.hits[hit].reserve_url}" target="_blank" class=" btn btn-primary">Reserve</a>
        </div>
      </div>
      `
    };
  }




//Render Payment Facets Function
function renderPaymentFacets(content, paymentContainer) {
  paymentContainer.innerHTML = '';
  const paymentFacet = JSON.stringify(content.results.getFacetValues('payment_options'));
  const paymentFacetArray = JSON.parse(paymentFacet);

    let paymentCheckbox='';
    paymentFacetArray.forEach(facet => {
      paymentCheckbox +=  
      `
      <div class="form-check">
      <input class="form-check-input" type="checkbox" value="${facet.name}" id="${facet.name}">
      <label class="form-check-label" for="paymentType">${facet.name}</label>
      </div>
      `;
    });
    paymentContainer.innerHTML += paymentCheckbox;

}
 
//Render Food Facets Function
function renderFoodFacets(content, foodContainer) {
  foodContainer.innerHTML = '';
  const foodFacet = JSON.stringify(content.results.getFacetValues('food_type'));
  const foodFacetArray = JSON.parse(foodFacet);

    let foodFacetList='';
    foodFacetArray.forEach(facet => {
      foodFacetList += `<li class="list-group-item" value="${facet.name}"> ${facet.name} <span class="badge text-bg-secondary food-type-count">${facet.count}</span></li>`;
    });
    foodContainer.innerHTML += foodFacetList;
  
}

function renderRatingStars(starContainer) {
  starContainer.innerHTML = '';
  let renderedStars = '';
  for (let i = 1; i < 6; i++) {
     renderedStars += `<li class="list-group-item rating-star" value=${i}> ${renderStars(i)}</li>`;

  }
  starContainer.innerHTML += renderedStars
}



// function renderRatingStars(content, starContainer) {
//   starContainer.innerHTML = '';
//   let starCountArray = [];
//   for(const hit in content.results.hits) {
//     let starCount = Math.floor(content.results.hits[hit].stars_count);
//     if(starCountArray.includes(starCount)) {
//       console.log(starCount + ' Already Exists');
//       continue; 
//     } else {
//       starCountArray.push(starCount);
//       let renderedStars = '';
//         for (let i = 0; i < starCountArray.length; i++) {
//         renderedStars = `<li class="list-group-item rating-star" value=${starCountArray[i]}>`;
//         renderedStars += renderStars(starCountArray[i]);
//         renderedStars += '</li>';
//       }
//       starContainer.innerHTML += renderedStars
//     }
//   }
// }


  export { renderHits, renderPaymentFacets, renderFoodFacets, renderRatingStars};
