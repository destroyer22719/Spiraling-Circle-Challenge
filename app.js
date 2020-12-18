let x = 1;
let y = 1;
let maxSteps = null;

let coordinates = {
  x: 1,
  y: 1,
};


$('#error')
.hide()
.text('');

//helper functions to make navigating easier
const right = (moves=1) => ({
  oldX: coordinates.x,
  oldY: coordinates.y,
  newX: coordinates.x+1*(moves),
  newY: coordinates.y,
})
const down = (moves=1) => ({
  oldX: coordinates.x,
  oldY: coordinates.y,
  newX: coordinates.x,
  newY: coordinates.y+1*(moves),
})
const left = (moves=1) => ({
  oldX: coordinates.x,
  oldY: coordinates.y,
  newX: coordinates.x-1*(moves),
  newY: coordinates.y,
})
const up = (moves=1) => ({
  oldX: coordinates.x,
  oldY: coordinates.y,
  newX: coordinates.x,
  newY: coordinates.y-1*(moves),
})

//check if brigdget can move to that location
const validCoordinates = ({newX, newY} = {}) => {
  return !$(`.grid-row:nth-child(${newY}) > .tile:nth-child(${newX})`).hasClass('cover') 
  && $(`.grid-row:nth-child(${newY}) > .tile:nth-child(${newX})`).length !== 0;
};

//moves bridget
const moveBridget = ({oldX, oldY, newX, newY}={}) => {
    $(`.grid-row:nth-child(${oldY}) > .tile:nth-child(${oldX})`).removeClass('bridget');
    $(`.grid-row:nth-child(${oldY}) > .tile:nth-child(${oldX})`).addClass('cover');
  
    $(`.grid-row:nth-child(${newY}) > .tile:nth-child(${newX})`).addClass('bridget');

    coordinates= {
      x: newX,
      y: newY,
    };
}

let height = null;
let width = null;
let coverHeight = null;
let coverWidth = null;

//event listeners for the buttons
$('#create').click(generateGrid);
$('#start').click(navigateBridgit);

//function to generate grid (house) for bridget to navigate in
function generateGrid() {

  //retrieving user dimension input
  width = +$('#width').val();
  height = +$('#height').val();
  coverHeight = +$('#coverHeight').val();
  coverWidth = +$('#coverWidth').val();

  //setting width and height of the grid
  $('.grid').empty();
  $('.grid').width(width*50);
  $('.grid').height(width*50);

  //validates user input
  if ((height - coverHeight*2) < 1 || (width - coverWidth*2) < 1) {
    $('#error')
      .show()
      .text('invalid corner dimensions');
    return;
  } 

  $('#error')
    .hide()
    .text('');

  //generates rows
  for (let i = 0; $('.grid').children().length < height; i++) {
    $('.grid').append(`<div class="grid-row"></div>`);
    //generates columns
    for (let j = 0; $(`.grid-row:nth-child(${i+1})`).children().length < width; j++) {
      $(`.grid-row:nth-child(${i+1})`).append(`<div class="tile"></div>`);
    }
  }
  
  //generates corners
  for(let i = 0; $('.grid-row .cover').length < (coverHeight*coverWidth)*4; i++) { 
    $(`.grid-row:nth-child(${i+1})`).children().each(function (j) {
      if (j+1 <= coverWidth) {
        $(this).addClass('cover');
      } else if (j+1 > width-coverWidth) {
        $(this).addClass('cover');
      }
    });
    $(`.grid-row:nth-last-of-type(${i+1})`).children().each(function (j) {
      if (j+1 <= coverWidth) {
        $(this).addClass('cover');
      } else if (j+1 > width-coverWidth) {
        $(this).addClass('cover');
      }
    });
  }

  //sets the starting position of Bridget
  $('.grid-row:nth-child(1) > .tile').each((i, e) => {
    if(validCoordinates({
      newX: 1+i,
      newY: 1,
    })) {
      coordinates.x = i+1;
      moveBridget({
        oldX: 1, 
        oldY: 1, 
        newX: i+1,
        newY: 1
      });
      return false;
    };
    return true;
  });
  
} 

//callback to navigate bridgit
function navigateBridgit () {
  let priority='RDLU';
  let steps = 0;
  maxSteps=+$('#maxSteps').val();

  while(steps < maxSteps) {
    switch(priority) {
      case 'RDLU':
        if(validCoordinates({...right()})) {
          moveBridget({...right()});
          steps++;
          continue;
        } else if (validCoordinates({...down()})) {
          moveBridget({...down()});
          steps++;
          continue;
        } else if (validCoordinates({...left()})) {
          if (!validCoordinates({...left(2)})) {
            //checks if the next left tile is valid, but the one after is invalid
            //this should only work when at the corner of tile 3
            //if it is, change the direction priority
            moveBridget({...left()});
            priority='LDUR';
            steps++;
            continue;
          } else {
            moveBridget({...left()});
            steps++;
            continue;
          }
        } else if (validCoordinates({...up()})) {
          moveBridget({...up()});
          steps++;
          continue;
        } else {
          $('span').text(`${coordinates.x}, ${coordinates.y}`);
          steps=maxSteps;
          break;
        }
      case 'LDUR': 
        if(validCoordinates({...left()})) {
          moveBridget({...left()});
          steps++;
          continue;
        } else if (validCoordinates({...down()})) {
          moveBridget({...down()});
          steps++;
          continue;
        } else if (validCoordinates({...up()})) {
          if (!validCoordinates({...up(2)})){
            //checks if the next up tile is valid, but the one after is invalid
            //this should only work when at the top corner of tile 4
            //if it is, change the direction priority
            moveBridget({...up()});
            steps++;
            priority='URDL';
            continue;
          } else {
            moveBridget({...up()});
            steps++;
            continue;
          }    
        } else if (validCoordinates({...right()})) {
          steps++;
          moveBridget({...right()}); 
          continue;
        } else {
          $('span').text(`${coordinates.x}, ${coordinates.y}`);
          steps=maxSteps;
          break;
        }
      case 'URDL': 
        if(validCoordinates({...up()})) {
          moveBridget({...up()});
          steps++;
          continue;
        } else if (validCoordinates({...right()})) {
          if(!validCoordinates({...right(2)})) {
            //checks if the next right tile is valid, but the one after is invalid
            //this should only work when at the right-most corner of tile 1
            //if it is, change the direction priority
            moveBridget({...right()});
            priority='RDLU';
            steps++;
            continue;
          } else {
            moveBridget({...right()});
            steps++
            continue;
          }
        } else if (validCoordinates({...down()})) {
          moveBridget({...down()});
          steps++;
          continue;
        } else if (validCoordinates({...left()})) {
          moveBridget({...left()});
          steps++
          continue;
        } else {
          $('span').text(`${coordinates.x}, ${coordinates.y}`);
          steps=maxSteps;
          break;
        }
    }
  }
  $('span').text(`${coordinates.x}, ${coordinates.y}`);
}
