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
        movieCard.classList.add("card-style");

        movieCard.innerHTML=` <img src="${movie.Poster}" class="image-style" />
          <div class="card-content">
            <h2>${movie.Title}</h2>
            <p>Here you can see a short description of this card.</p>
          </div>
          <div class="card-bottom" style="display: inline;">
            <a  href="movie.html?id=${movie.imdbID}"><button class="primary" >MOVIE DETAILS</button></a>
          </div>
          <div class="card-bottom" style="display: inline-block;">
            <button class="primary remove-button " data-imdbid="${movie.imdbID}" >REMOVE FROM FAVOURITES</button>
          </div>`;

          favContainer.appendChild(movieCard);
    });    

  }

  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach(button => {
      button.addEventListener('click', removeFromFavourites);
  });
}  