// cache selectors
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const easyBtn = document.querySelector("#easyBtn");
const hardBtn = document.querySelector("#hardBtn");

let colors = generateRandomColors(6);
let pickedColor = pickColor();
let numSquares = 6;

// Generate a random RGB Color
function randomColor(){
	//pick a "red" from 0 - 255
	let r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 - 255
	let g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 - 255
	let b = Math.floor(Math.random() * 256);
	"rgb(r, g, b)"
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

// Create an array with num of random colors
function generateRandomColors(num){
	//make an array
	let arr = []
	//repeat num times
	for(let i = 0; i < num; i++){
		//get random color and push into arr
		arr.push(randomColor())
	}
	//return that array
	return arr;
}


function pickColor(){
	let random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// Change each squares background to the assigned RGB color
function changeColors(color){
	//loop through all squares
	for(let i = 0; i < squares.length; i++){
	//change each color to match given color
	squares[i].style.backgroundColor = color;	
	} 
}



// Event Listeners

easyBtn.addEventListener("click", function(){
	hardBtn.classList.remove("selected");
	easyBtn.classList.add("selected");
	numSquares = 3;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(let i = 0; i < squares.length; i++){
		if (colors[i]){
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
});

hardBtn.addEventListener("click", function(){
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected");
	numSquares = 6;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(let i = 0; i < squares.length; i++){
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		
	}
});

resetButton.addEventListener("click", function(){
  //generate all new colors
  colors = generateRandomColors(numSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match picked Color
  colorDisplay.textContent = pickedColor;
  this.textContent = "New Colors";
  messageDisplay.textContent = "";
  //change color of squaresuares
  for(let i = 0; i < squares.length; i++){
  	squares[i].style.backgroundColor = colors[i];
  }
  h1.style.backgroundColor = "steelblue";
})

colorDisplay.textContent = pickedColor;

for(let i = 0; i < squares.length; i++){
	//add initial colors to squares
  	squares[i].style.backgroundColor = colors[i];

  	//add click listeners to squares
  	squares[i].addEventListener("click", function(){
  		//grab color of clicked square
  		let clickedColor = this.style.backgroundColor;
  		//compare color to picked Color
  		if(clickedColor === pickedColor){
  			messageDisplay.textContent = "Correct!";
  			resetButton.textContent = "Play Again?";
  			changeColors(clickedColor);
  			h1.style.backgroundColor = clickedColor;
		} 
		else {
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again";
		}
  	});
}






