// cache selectors
const memeResults = document.querySelector('#memeResults');
const imageUrl = document.querySelector('#imageUrl');
const topText = document.querySelector('#topText');
const bottomText = document.querySelector('#bottomText');
const form = document.querySelector('#generateMeme');


form.addEventListener('submit', function(e) {
	e.preventDefault();
	createMeme();
})



function createMeme() {

	// create elements
	let memeDiv = document.createElement('div');
	let topTextDiv = document.createElement('div');
	let bottomTextDiv = document.createElement('div');
	let removeButton = document.createElement('button');
	let img = document.createElement('img');
	
	// set values
	img.src = imageUrl.value;
	topTextDiv.innerText = topText.value
	bottomTextDiv.innerText = bottomText.value
	removeButton.innerText = "Remove Meme";

	// set classes
	topTextDiv.classList.add('top');
	bottomTextDiv.classList.add('bottom');
	memeDiv.classList.add('meme')
	removeButton.classList.add('remove');
	img.classList.add('img')

	// set up remove button logic
	removeButton.addEventListener('click', function(e) {
		e.target.parentElement.remove();
	});

	// clear values after submitting
	imageUrl.value = ''
	topText.value = ''
	bottomText.value = ''

	// append 
	memeDiv.append(removeButton, img, topTextDiv, bottomTextDiv, );
	memeResults.append(memeDiv);
}