//json we want
const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

//empty array for storing incoming json
const restaurants = [];

//fetch data from endpoint and ensure error is caught
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => restaurants.push(...data))
  .catch((err) => {
    console.log(err);
  });
  
//match based on restaurant name and category
function findMatches(wordToMatch, restaurants) {
  return restaurants.filter(place => {
    //regex to match names/category cAsE INSensiTIveLy
    const regex = new RegExp(wordToMatch, 'gi');
    return place.name.match(regex) || place.category.match(regex)
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, restaurants);
  //create li containing spans (stylized text) for name, category, and address
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const restaurantName = place.name.replace(regex, `<span class="hl">${this.value}</span>`);
    const restaurantCategory = place.category.replace(regex, `<span class="hl">${this.value}</span>`);
    const restaurantAddress = place.address_line_1;
    return `
      <li>
      <div class="listItem">
        <span class="name">${restaurantName}</span>
        <br>
        <span class='category'>${restaurantCategory}</span>
        <br>
        <span class="address">${restaurantAddress}</span>
      </div>
      </li>
      <br>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

if (!document.getElementById("search").value)
{
    console.log("Box empty")
    
}