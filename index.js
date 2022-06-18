const apiUrl = "https://www.omdbapi.com";
const searchBtn = document.querySelector(".search-btn");
// searchBtn.addEventListener("click", (e) => {
//   console.log("search btn clicked");
//   const movieTitle = document.querySelector(".movie-input").value;
//   console.log(movieTitle);
//   getMovieByTitle(movieTitle);
// });

function setAttributes(ele,attrs){
  for(const key in attrs){
    // console.log(key,attrs[key]);
    ele.setAttribute(key,attrs[key]);
  }
}

function createMovieFrame(movieDetail){
  const contentSection = document.querySelector(".content-section");

  const col = document.createElement("div");
  col.className = "col-md-3 my-3";

  const card = document.createElement("div");
  card.className = "col card";

  const poster = document.createElement("img");
  poster.setAttribute("src",movieDetail.Poster);
  poster.className = "card-img-top";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = movieDetail.Title;

  const cardSubTitle = document.createElement("h6");
  cardSubTitle.className = "card-subtitle mb-2 text-muted"
  cardSubTitle.textContent = movieDetail.Year;

  const moreDetailBtn = document.createElement("button");
  setAttributes(moreDetailBtn,{
    "type":"button",
    "class":"btn btn-primary",
    "data-bs-toggle":"modal",
    "data-bs-target":"#movieDetailModal"
  });

  moreDetailBtn.textContent = "More Detail";

  // append
  if(preserveLog===true){
    contentSection.appendChild(col);
    col.appendChild(card);
    card.appendChild(poster);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubTitle);
    cardBody.appendChild(moreDetailBtn);
  }

  showMovieDetail(moreDetailBtn,movieDetail);
}


function showMovieDetail(moreDetailBtn,movieDetail){
  moreDetailBtn.addEventListener("click",() => {
    console.log("detail btn clicked!");

    const imgModal = document.querySelector(".img-modal");
    const movieDetailTitle = document.getElementById("movieDetailModalLabel");
    const plot = document.querySelector(".plot");
    const genre = document.querySelector(".genre");
    const rated = document.querySelector(".rated");
    const duration = document.querySelector(".duration");
    const releaseDetail = document.querySelector(".release-detail");
    const actors = document.querySelector(".actors");
    const director = document.querySelector(".director");
    const writer = document.querySelector(".writer");
    
    imgModal.setAttribute("src", movieDetail.Poster);
    movieDetailTitle.textContent = movieDetail.Title;
    plot.textContent = movieDetail.Plot;
    genre.textContent = movieDetail.Genre;
    rated.innerHTML =  `<strong>${movieDetail.Rated}</strong>`;
    duration.textContent = movieDetail.Runtime;
    releaseDetail.textContent =  "Released: "+ movieDetail.Released;
    actors.textContent = "Actors: " + movieDetail.Actors;
    director.textContent = "Director: " + movieDetail.Director;
    writer.textContent = "Writer: " + movieDetail.Writer;

  })
}

function getMovieById(movieId,apiKey){
  console.log(movieId);
  const promise = fetch(`${apiUrl}/?apikey=${apiKey}&i=${movieId}`);
  promise.then(response => response.json())
    .then(movieDetail => {
      console.log(movieDetail);
      createMovieFrame(movieDetail);
    }).catch(err => console.error(err))

}

// search any movies by title
function getMovieByTitle(movieTitle){
  const apiKey = "1a202bd2";
  const promise = fetch(`${apiUrl}/?apikey=${apiKey}&s=${movieTitle}`);
  promise.then(response => response.json())
    .then(result => {
      result["Search"].forEach(movie => {
        getMovieById(movie["imdbID"],apiKey);
      });
    })
    .catch(error => console.log('error', error));
}

getMovieByTitle("avengers");