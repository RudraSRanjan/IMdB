 const apikey='c7f9e656';

async function searchMovies(query)
{
    const response= await fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${query}`);
    const data= await response.json();
    return data.Search || [] ;
}

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

function displaySearchResults(results) {
    const searchResultsContainer = document.getElementById('cards-container');
    searchResultsContainer.innerHTML = '';

    results.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('card-style');
        movieCard.innerHTML = `
          
            <img src="${movie.Poster}" class="image-style" />
            <div class="card-content">
              <h2>${movie.Title}</h2>
              <p>${movie.Plot}</p>
            </div>
            <div class="card-bottom" style="display: inline;">
              <a  href="href="movie.html?id=${movie.imdbID}" ><button class="primary" >MOVIE DETAILS</button></a>
            </div>
            <div class="card-bottom" style="display: inline-block;">
              <button class="primary favourite-button" data-imdbid="${movie.imdbID} >ADD TO FAVOURITES</button>
            </div>
         
        `;
        searchResultsContainer.appendChild(movieCard);
    });

    const favouriteButtons = document.querySelectorAll('.favourite-button');
    favouriteButtons.forEach(button => {
        button.addEventListener('click', addToFavourites);
    });

}


const searchButton = document.getElementById('searchSong');
searchButton.addEventListener('click', function () {
    const query = document.getElementById('textSearchSong').value.trim();
    if (query.length > 0) {
        searchMovies(query)
            .then(results => {
                displaySearchResults(results);
                // Store the search results in LocalStorage
                localStorage.setItem('cards-container', JSON.stringify(results));
            })
            .catch(error => console.error('Error searching movies:', error));
    }
});

async function getMovieDetails(imdbID) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${imdbID}`);
    const data = await response.json();
    return data.Response === 'True' ? data : null;
}

const previousSearchResults = JSON.parse(localStorage.getItem('cards-container'));
if (previousSearchResults && previousSearchResults.length > 0) {
    displaySearchResults(previousSearchResults);
}