function displayFav()
{
    const favContainer= document.getElementById("cards-container");
    favContainer.innerHTML="";

    const favouritesList= JSON.parse(localStorage.getItem('favourites')) || [];

    if(favouritesList.length===0)
        {
          const emptyMessage = document.createElement('p');
          emptyMessage.textContent = 'Your favourites list is empty.';
          favContainer.appendChild(emptyMessage);
        }
    else
    {
        favouritesList.forEach(movie => { 
        const movieCard = document.createElement('div');
        movieCard.classList.add("searchResults");

        movieCard.innerHTML=` <img src="${movie.Poster}" class="image-style">
            <div class="card-content">
              <h2>${movie.Title}</h2>
              <p>${movie.Plot}</p>
            </div>
            <div class="card-bottom" style="display: inline;">
               <a href="movie.html?id=${movie.imdbID}" class="btn btn-warning btn-m more-button">More</a>
            </div>
            <div class="card-bottom" style="display: inline-block;">
             <button class="btn btn-warning btn-m favourite-button remove-button" data-imdbid="${movie.imdbID}">Remove from Favourites</button>
            </div>`;

          favContainer.appendChild(movieCard);
    });    

  }

  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach(button => {
      button.addEventListener('click', removeFromFavourites);
  });
}  


function removeFromFavourites(event) {
  const imdbID = event.target.dataset.imdbid;
  const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];

  const movieToRemove = favouritesList.find(movie => movie.imdbID === imdbID);
  if (movieToRemove) {
      const updatedFavouritesList = favouritesList.filter(movie => movie.imdbID !== imdbID);
      localStorage.setItem('favourites', JSON.stringify(updatedFavouritesList));
      alert(`${movieToRemove.Title} has been removed from your favorites!`);
      displayFav(); // Refresh the favorites list
  } else {
      alert('Movie not found in favorites!');
  }
}

// Automatically display favorites when the favourites.html page is loaded
document.addEventListener('DOMContentLoaded',()=> {
  displayFav();
});

// Event listener for the "Favorites" link in the header on the index.html page
const favouritesLink = document.querySelector('a[href="favourites.html"]');
favouritesLink.addEventListener('click', displayFav);