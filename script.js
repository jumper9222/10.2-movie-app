const movieSearchInput = document.getElementById("movieName")
const movieInfoDisplay = document.getElementById("movieInfo")

function formatMovieName(input) {
  const formattedInput = input.split(" ").join("%20")
  //console.log(`format mov name ${formattedInput}`)
  return formattedInput
}

async function fetchMovieData(movieTitle) {
  const response = await fetch(`https://www.omdbapi.com/?apikey=258a2345&t=${movieTitle}`);
  if (response.ok) {
  const data = await response.json()
  //console.log(`fetch mov data ${data}`)
  return data;
  } else {
    throw new Error("Error fetching bus arrival data");
    }
}

function formatMovieInfo(movieInfo) {
  const { Title, Poster, Director, imdbRating } = movieInfo;
  const formattedMovieInfo = `
  <h2>${Title}</h2>
  <img src="${Poster}" alt="Poster" width="500">
  <p>Director: ${Director}</p>
  <p>Rating: ${imdbRating}</p>
  `;
  //console.log(`format mov inf ${formattedMovieInfo}`)
  return formattedMovieInfo
}

function displayMovieInfo(movieInfo) {
  const formattedMovieInfo = formatMovieInfo(movieInfo);
  movieInfoDisplay.innerHTML = formattedMovieInfo
}

async function searchMovie() {
  const movieName = formatMovieName(movieSearchInput.value);
  const movieInfo = await fetchMovieData(movieName);
  displayMovieInfo(movieInfo)
}