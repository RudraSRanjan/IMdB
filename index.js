const apikey='c7f9e656';

async function searchMovie(query)
{
    const response= await fetch("https://www.omdbapi.com/?apikey=${apiKey}&s=${query}");
    const data= await response.json();
    return data.Search || [];
}