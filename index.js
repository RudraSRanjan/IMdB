 const apiKey='c7f9e656';





async function searchMovies(query) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
    const data = await response.json();
    return data.Search || [];
}

// Function to add a movie to favourites
async function addToFavourites(event) {
    const imdbID = event.target.dataset.imdbid;
    const movie = await getMovieDetails(imdbID);
    if (movie) {
        const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];
        if (!favouritesList.some(m => m.imdbID === movie.imdbID)) {
            favouritesList.push(movie);
            localStorage.setItem('favourites', JSON.stringify(favouritesList));
            alert(`${movie.Title} has been added to your favourites!`);
        } else {
            alert(`${movie.Title} is already in your favourites!`);
        }
    }
}

// Function to display search results on the index.html page
function displaySearchResults(results) {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';

    results.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('card-style');
        movieCard.innerHTML = `
            <img src="${movie.Poster}" class="image-style">
            <div class="card-content">
              <h2>${movie.Title}</h2>
            
            </div>
            <div class="card-bottom" style="display: inline;">
               <a href="movie.html?id=${movie.imdbID}" class="btn btn-warning btn-m more-button">More</a>
            </div>
            <div class="card-bottom" style="display: inline-block;">
             <button class="btn btn-warning btn-m favourite-button" data-imdbid="${movie.imdbID}">Add to Favourites</button>
            </div>`;
        searchResultsContainer.appendChild(movieCard);
    });

    const favouriteButtons = document.querySelectorAll('.favourite-button');
    favouriteButtons.forEach(button => {
        button.addEventListener('click', addToFavourites);
    });
}

// Event listener for the Search Button
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function () {
    const query = document.getElementById('searchInput').value.trim();
    if (query.length > 0) {
        searchMovies(query)
            .then(results => {
                displaySearchResults(results);
                // Store the search results in LocalStorage
                localStorage.setItem('searchResults', JSON.stringify(results));
            })
            .catch(error => console.error('Error searching movies:', error));
    }
});



// Function to get movie details by IMDb ID
async function getMovieDetails(imdbID) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
    const data = await response.json();
    return data.Response === 'True' ? data : null;
}

// Automatically display search results if available from previous search
const previousSearchResults = JSON.parse(localStorage.getItem('searchResults'));
if (previousSearchResults && previousSearchResults.length > 0) {
    displaySearchResults(previousSearchResults);
}

