const apiUrl = "https://www.omdbapi.com";

const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", (e) => {
  // console.log("search btn clicked");
  const movieTitle = document.querySelector(".movie-input").value;
  // console.log(movieTitle);
  getMovieByTitle(movieTitle);
});

function createMovieFrame(movieDetail){
  const contentSection = document.querySelector(".content-section");

  // creating movie card
  const cardContainer = document.createElement("div");
  cardContainer.className = "card col-3 my-3 w-30";
  cardContainer.innerHTML = `
    <div class="col card  my-2">
      <img src="${movieDetail.Poster}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${movieDetail.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${movieDetail.Year}</h6>
        <button type="button" class="btn btn-primary movie-detail-modal-btn" data-bs-toggle="modal" data-bs-target="#movieDetailModal">More Detail</button>
      </div>
    </div>`
  ;
  contentSection.appendChild(cardContainer);
  
  const modalBtn = cardContainer.getElementsByTagName("button")[0];
  // console.log(modalBtn);

  // show the detail of the movie
  showMovieDetail(modalBtn,movieDetail)
}

function showMovieDetail(modalBtn,movieDetail){
  const movieModalContainer = document.querySelector(".movie-modal-container");
  const modalBody = document.querySelector(".modal-body");
  
  const containerModal = document.createElement("div");
  modalBtn.addEventListener("click", function(){
    const modalTitle = document.querySelector(".modal-title");
    modalTitle.textContent = movieDetail.Title;
    containerModal.className = "container-fluid";
    containerModal.innerHTML = `
      <div class="row">
        <div class="col-md">
          <img class="img-fluid img-modal" src=${movieDetail.Poster}>
        </div>
        
        <div class="col-md">
          <ul class="list-group">
            <li class="list-group-item genre"><strong>Genre: </strong>${movieDetail.Genre}</li>
            <li class="list-group-item plot"><strong>Plot: </strong>${movieDetail.Plot}</li>
            <li class="list-group-item rated"><strong>Rated: </strong>${movieDetail.Rated}</li>
            <li class="list-group-item duration"><strong>Duration: </strong>${movieDetail.Runtime}</li>
            <li class="list-group-item release-detail"><strong>Release: </strong>${movieDetail.Released}</li>
            <li class="list-group-item director"><strong>Director: </strong>${movieDetail.Director}</li>
            <li class="list-group-item actors"><strong>Actors: </strong>${movieDetail.Actors}</li>
            <li class="list-group-item writer"><strong>Writer: </strong>${movieDetail.Writer}</li>
          </ul>
        </div>
      </div>
      `
    ;

    modalBody.appendChild(containerModal);
  });

  movieModalContainer.addEventListener('click', function(e){
    const currTarget = e.target;
    const currTargetClass = currTarget.classList;
    console.log(currTargetClass);
    if(currTargetClass.contains("movie-modal-container") || currTargetClass.contains("modal-close-btn") || currTargetClass.contains("btn-close")){
      // console.log(`contains ${currTarget}`);
      containerModal.remove()
    }
    console.log(currTarget);
  }); 
}

function getMovieById(movieId,apiKey){
  // console.log(movieId);
  fetch(`${apiUrl}/?apikey=${apiKey}&i=${movieId}`)
    .then(response => response.json())
    .then(movies => {
      // console.log(movies);
      createMovieFrame(movies);
      // showMovieDetail(movies);
    })
    .catch(err => console.error(err))
  ;

}

// search any movies by title
function getMovieByTitle(movieTitle){
  const apiKey = "1a202bd2";
  // get a data from this API
  fetch(`${apiUrl}/?apikey=${apiKey}&s=${movieTitle}`)
    // then we will receive a "http response"
    .then(response => {
      // we need to check if the response is okay(2xx) or not
      if(!response.ok){
        throw new Error(`error response status is ${response.status}`);
      }

      console.log(`the response is ${response.status}`);
      return response.json();
    })
    // if everything in above is alright thus
    // we can assure that we get the actual data
    .then(movies => {
      console.log(movies,typeof(movies.Response));
      // if the movie is not found
      if(movies.Response==="False"){
        // the log this message "Error: Movie not found!"
        throw new Error(`${movies.Error}`);
      }
      movies["Search"].forEach(movie => {
        getMovieById(movie["imdbID"],apiKey);
      });
    })
    // if there is something wrong with all above
    .catch(err => {
      console.error(err);
      alert(err);
    })
  ;
}
