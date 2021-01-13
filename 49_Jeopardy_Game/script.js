"use strict";
const numOfCategories = 6;
const numOfQuestions = 5;
let categoryStorage = [];

// return 6 random category Ids
async function getCategoryIds() {
  // get 100 categories from API
  let res = await axios.get('http://jservice.io/api/categories', { params: {count: 100}});
  // create new empty array to store the categories
  let categoryIds = [];
  // push 100 categories into categoryIds array
  res.data.forEach(category => categoryIds.push(category.id));
  // pick 6(numofCategories) random category Ids from the categoryIds array and return them
  return _.sampleSize(categoryIds, numOfCategories);
}

// return an object with {title, clues} format
async function getCategory(catId) {
  // get a specific category from API by passing in catId
  let res = await axios.get('http://jservice.io/api/category', { params: {id: catId} });
  // get all of the clues for the category
  let getClues = res.data.clues;
  // pick 5(numOfQuestions) random clues from all of the clues
  let randomClues = _.sampleSize(getClues, numOfQuestions)
  // create a clues array with the needed data format
  let clues = randomClues.map( cat => ({
    question: cat.question,
    answer: cat.answer,
    showing: null,
  }));

  
  // return an object with {title, clues} format
  return {
    title : res.data.title, 
    clues
  };
}

// Handle clicking on a clue: show the question or answer
function handleClick(e) {
  // get the id of the clicked target
  let id = e.target.id;
  // if user clicks on a category name, alert users that they need to click on a cell below to get a clue
  if (id === "categoryName") {
    alert('Pick your desired clue from below');
    return;
  }
  // get corresponding category and clue values from the id of clicked cell
  let [catId, clueId] = id.split("-");
  // identify the correct clue object by using the catId and clueId values
  let clue = categoryStorage[catId].clues[clueId];
  // declare an empty variable
  let displayText = null;
  // initially clue.showing starts as null. If it's still null:
  if (clue.showing === null) {
    // set displayText as the clue question so we can show user that
    displayText = clue.question;
    // change clue.showing to "question" to imply that cell is now displaying the question
    clue.showing = "question";
    // if a cell is displaying a question:
  } else if (clue.showing === "question") {
    // set displayText as the clue answer so we can show user that
    displayText = clue.answer;
    // change clue.showing to "answer" to imply that cell is now displaying the answer
    clue.showing = "answer";
    // only remaining possible case is already showing the answer
  } else {
    // don't do anything
    return;
  }
  // Update the cell with the appropriate text
  $(`#${catId}-${clueId}`).text(displayText);
}

// generate random multiples of 100 to display as initial cell values
function getRandomHundreds() {
  return (Math.floor(Math.random() * 10 + 1) * 100); 
}

// create game table
async function fillTable() {
  // create a new div for the entire game
  let $gameDiv = $('<div>').attr('id', 'gameDiv');
  // create a new table
  const $gameTable = $('<table>').attr('id', 'gameTable');
  // create a new top row
  const $topRow = $('<tr>').attr('id', 'topRow');
  // append top row to table
  $($gameTable).append($topRow);
  // append game table to game div
  $($gameDiv).append($gameTable)
  // append game div to body
  $($gameDiv).appendTo('body');

  // create the header cells
  for (let catId = 0; catId < numOfCategories; catId++) {
    // create 6(numOfCategories) header cells and display the corresponding category title in each cell
    const $categoryName = $('<td>').attr('id', 'categoryName').text(categoryStorage[catId].title);
    // append these header cells into top row
    $($topRow).append($categoryName);
  }

  // create rows
  for (let clueId = 0; clueId < numOfQuestions; clueId++) {
    // create 5(numOfQuestions) rows 
    const $row = $('<tr>').attr('id', 'categoryRow');
    // create clue cells
    for (let catId = 0; catId < numOfCategories; catId++) {
      // create 6(numOfCategories) clue cells, give them their corresponding [catId]-[clueId] as their Id, and display random multiples of hundreds as the question value
      const $cell = $('<td>').attr('id', `${catId}-${clueId}`).html(getRandomHundreds());
      // append clue cells into each row
      $($row).append($cell);
    }
    // append each row into game table
    $($gameTable).append($row);
  }
}

// set up and start game
async function setupAndStart() {
  // show loading view while getting data from API
  showLoadingView();
  // set categoryStorage to empty array to get new category ids each time game restarts
  categoryStorage = [];
  // get 6 random category ids
  let categoryIds = await getCategoryIds();
  // for each category id:
  for (let categoryId of categoryIds) {
    // get category object with the correspondind id and push it to categoryStorage array
    categoryStorage.push(await getCategory(categoryId));
  }
  // hide loading view after getting data from API
  hideLoadingView();
  // fill table with data
  fillTable();
}


// wipe the current Jeopardy board, show the loading spinner, and update the button used to fetch data
function showLoadingView() {
  $startBtn.hide();
  let $loading = $('<div>').attr('id', 'loader');
  $($loading).appendTo('body');
}

// remove the loading spinner and update the button used to fetch data
function hideLoadingView() {
  $('#loader').remove();
  $startBtn.text('Restart Game')
  $startBtn.show();
}

// on click of start / restart button, set up game
const $startBtn = $('<button>').attr('id', 'startBtn').appendTo('body');
$startBtn.text('Start Game');
$('body').append($startBtn);

$($startBtn).on("click", function(e) {
  $('#gameDiv').remove();
  e.preventDefault();
  setupAndStart();
})

// on page load, add event handler for clicking clues 
$(async function () {
  $("body").on("click", "td", handleClick);
}
);




