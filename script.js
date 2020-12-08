const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();
let ticketPrice = +movieSelect.value;
console.log(ticketPrice);

//Det data from localstorage and popute in UI
function populateUI() {
  const selectedSeat_L = JSON.parse(localStorage.getItem("selectedSeats"));
  console.log("Local Storage selected seats " + selectedSeat_L);
  if (selectedSeat_L !== null && selectedSeat_L.length > 0) {
    seats.forEach((seat, index) => {
      // If the selected index is there
      if (selectedSeat_L.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex_L = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex_L !== null) {
    movieSelect.selectedIndex = selectedMovieIndex_L;
  }
}

//Save Selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// To Update Total and COunt
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const selectedSeatsCount = selectedSeats.length;
  console.log(selectedSeats + " and " + selectedSeatsCount);
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  //Save in local storage
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });
  console.log("SeatsIndex " + seatsIndex);
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
}

//Movie Select Event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  console.log("SelectedMovie Index" + e.target.selectedIndex);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//Seat Click Event
container.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

//Intial cont and total
updateSelectedCount();
