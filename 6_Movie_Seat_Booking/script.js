// Cache selectors
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

// Save selected movie index and price to local storage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)
}

// Update total and count and save to local storage
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;

  total.innerText = selectedSeatsCount * ticketPrice;
  
}

// Get data from localStorage and populate UI
function populateUI() {
  // Get selected seats from localStorage
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  // Add selected class to selected seats
  if (selectedSeats !== null && selectedSeats.length > 0) {
    selectedSeats.forEach((seat) => {
      seats[seat].classList.add('selected');
    });
  }

  // Get selected movie from localStorage
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  // Set movie as the selected movie
  if (selectedMovieIndex != null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

  // Update total based on selected movie 
  if (+ticketPrice !== null) {
    total.innerText = +ticketPrice * selectedSeats.length;
    count.innerText = selectedSeats.length;
  }
}

// Event Listeners

// Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
})

// Seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// On Load
populateUI();