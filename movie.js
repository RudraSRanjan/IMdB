const apiKey="c7f9e656";

async function getMovieDetailsById(imdbID)
{
    const response= await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
    const data= await response.json();
    return data.Response==="True" ? data :null;

}

function displayMovieDetails(movie)
{
    const movieDetailsContainer= document.getElementById("movieDetails");
    movieDetailsContainer.innerHTML=`<img src="${movie.Poster}" class="movie-card-img" alt="${movie.Title}">
         
          <div class="movie-description">
            
                <h5 class="card-title">${movie.Title}</h5>
                <p>${movie.Plot}</p>
                <p><strong>Year:</strong>${movie.Year}</p>
                <p><strong>Director:</strong> ${movie.Director}</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Runtime:</strong> ${movie.Runtime}</p>
                <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
          </div>`;
} 

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const imdbID = urlParams.get('id');

    if (imdbID) {
        getMovieDetailsById(imdbID)
            .then(movie => {
                if (movie) {
                    displayMovieDetails(movie);
                } else {
                    const movieDetailsContainer = document.getElementById('movieDetails');
                    movieDetailsContainer.innerHTML = '<p>Movie details not found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                const movieDetailsContainer = document.getElementById('movieDetails');
                movieDetailsContainer.innerHTML = '<p>Error fetching movie details.</p>';
            });
    }
});