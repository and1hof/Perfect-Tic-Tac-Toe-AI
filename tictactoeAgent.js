// Tic Tac Toe

var Agent = function () {

}

Agent.prototype.selectMove = function(board) {
	  // holds list of avail. cells
    var freeCells = [];
    // populates list of avail. cells by iterating.
    for (var i = 1; i < 10; i++) {
        if (board.cellFree(i)) freeCells.push(i);
    }

    var layout = [8,1,6, // just for reference
    			        3,5,7,
    			        4,9,2];

   // https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy
   // According to "Newell and Simon", this is a "perfect" tic-tac-toe game.

    // just switch variables around depending on the player.
    if (board.clone().playerOne) {
     var px = board.X;
     var po = board.O;
    } else {
     var px = board.O;
     var po = board.X;
    }

    var corners   = [8,6,4,2];
    var forks     = [[4,6],[8,2],[8,2],[4,6]]
    var opposites = [2,4,6,8];


 		// Step #1 -> Win if possible
 		for (var i = 0; i < px.length; i++) {
 			for (var o = 0; o < px.length; o++) {
 				for (var k = o; k < freeCells.length; k++) {
 					if (px[i] + px[o] + freeCells[k] == 15 && px[i] != px[o]) {
 						return freeCells[k];
 					}
 				}
 			}
 		}

 		// Step #2 -> Prevent enemy from winning if win is not possible for player.
 		for (var i = 0; i < po.length; i++) {
 			for (var o = 0; o < po.length; o++) {
 				// prevent enemy from winning
 				for (var k = 0; k < freeCells.length; k++) {
 					if (po[i] + po[o] + freeCells[k] == 15 && po[i] != po[o]) {
 						return freeCells[k];
 					}
 				}
 			}
 		}


    // Step #3 -> Check for possible forks.
    if (px.indexOf(5) > -1) {
      for (var i = 0; i < corners.length; i++) {
        if (px.indexOf(corners[i])) {
          if (freeCells.indexOf(forks[i][0]) > -1) 
            return forks[i][0];
          if (freeCells.indexOf(forks[i][1]) > -1)
            return forks[i][1];
        }
      }
    }

    // Step #4 -> Block enemy forks.
    for (var i = 0; i < forks.length; i++) {
      if (po.indexOf(forks[i][0]) > -1 && po.indexOf(forks[i][1])) {
        if (po.indexOf(corners[i]) > -1) {
          if (freeCells.indexOf(corners[i] + forks[i][0]) > -1) {
            return corners[i] + forks[i][0];
          } else if (freeCells.indexOf(corners[i] + forks[i][1]) > -1) {
            return corners[i] + forks[i][1];
          }
        }
      }
    }

    // Step #5 -> Play center.
    if (freeCells.indexOf(5) > -1) {
      return 5;
    }

    // Step #6 -> Play opposite corners.
    for (var i = 0; i < corners.length; i++) {
      if (po.indexOf(corners[i]) > -1 && freeCells.indexOf(opposites[i]) > -1) {
        return opposites[i];
      }
    }

    // Step #7 -> Empty Corners.
    for (var i = 0; i < corners.length; i++) {
      if (freeCells.indexOf(corners[i]) > -1) {
        return corners[i];
      }
    }

    // Step #8 -> Empty sides.
    var sides = [3,9,7,1];
    for (var i = 0; i < sides.length; i++) {
      if (freeCells.indexOf(sides[i]) > -1) {
        return sides[i];
      }
    }
}

