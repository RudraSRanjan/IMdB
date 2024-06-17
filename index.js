 const apikey='c7f9e656';

async function searchMovie()
{
    const response= await fetch("https://www.omdbapi.com/?apikey=c7f9e656&i=tt1285016");
    const data= await response.json();
    return data.Search || [] ;
}

