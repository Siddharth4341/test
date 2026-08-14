let sections = document.querySelectorAll(".board-section");
sections.forEach(section => {
  section.innerHTML = `
    <button></button>
    <button></button>
    <button></button>
   
    <button></button>
    <button></button>
    <button></button>
      
    <button></button>
    <button></button>
    <button></button>
  `
});

let bigBoardState = [
  0, 0, 0,
  0, 0, 0,
  0, 0, 0
];
let boardState = [
  0, 0, 0,
  0, 0, 0,
  0, 0, 0
];
let canTie = false;
let storeMini = true;
let canTieCount = 0;
let turnCount = 0;
for(let i = 0; i <= 8; i++) {
  sections[i].id = i;
  for(let j = 0; j <= 8; j++) {
    sections[i].children[j].id = i.toString() + "-" + j.toString();
    let allChildren = sections[i].children[j];
    allChildren.addEventListener("click", (event) => {
      let x = turnCount % 2 === 0? true : false;
      turnCount++;
      event.target.innerHTML = x === true ? "x" : "o";
      event.target.disabled = true;
      let y = allChildren.id;
      y = y.split("-");
      
      for(let k = 0; k <= 8; k++) {
        for(let l = 0; l <= 8; l++) {
          let AllChildren = sections[k].children[l];
          AllChildren.disabled = true;
          if(sections[k].id == y[1]) {
            sections[k].children[l].disabled = false;
          }
        } 
        for(let l = 0; l <= 8; l++) {
          let AllChildren = sections[k].children[l];
          if(AllChildren.textContent != "") {
            AllChildren.disabled = true;
          }
        }
      }
      function checkWin(position) {
        boardState.forEach((mark, index) => {
          boardState.splice(index, 1, storeMini.children[index].textContent);
        })

        boardState.forEach((mark) => {
          if(mark != "") {
            canTieCount++;
          }
        })
        if(canTieCount == 9) {
          canTie = true;
        }

        if(boardState[0]+boardState[1]+boardState[2] == "xxx" || boardState[3]+boardState[4]+boardState[5] == "xxx" || boardState[6]+boardState[7]+boardState[8] == "xxx" || boardState[0]+boardState[3]+boardState[6] == "xxx" || boardState[1]+boardState[4]+boardState[7] == "xxx" || boardState[2]+boardState[5]+boardState[8] == "xxx" || boardState[0]+boardState[4]+boardState[8] == "xxx" || boardState[2]+boardState[4]+boardState[6] == "xxx") {
          for(let k = 0; k <= 8; k++) {
            sections[y[0]].children[k].style.backgroundColor = "#C62E2E"
          }
          bigBoardState.splice(y[0], 1, "x");
        }
        else if(boardState[0]+boardState[1]+boardState[2] == "ooo" ||     boardState[3]+boardState[4]+boardState[5] == "ooo" || boardState[6]+boardState[7]+boardState[8] == "ooo" || boardState[0]+boardState[3]+boardState[6] == "ooo" || boardState[1]+boardState[4]+boardState[7] == "ooo" || boardState[2]+boardState[5]+boardState[8] == "ooo" || boardState[0]+boardState[4]+boardState[8] == "ooo" || boardState[2]+boardState[4]+boardState[6] == "ooo") {
          for(let k = 0; k <= 8; k++) {
            sections[y[0]].children[k].style.backgroundColor = "#11468F"
          }
          bigBoardState.splice(y[0], 1, "o");
        }
        else if(canTie) {
          for(let k = 0; k <= 8; k++) {
            sections[y[0]].children[k].style.backgroundColor = "#6BCB77"
          }
        }
        canTie = false;
        canTieCount = 0;
        
        let setTie = true;
        bigBoardState.forEach((val) => {
          if(val == 0) {
            setTie = false;
          }
        })
        
        function delte() {
            for(let k = 0; k <= 8; k++) {
              for(let l = 0; l <= 8; l++) {
                let moreAllChildren = sections[k].children[l];
                moreAllChildren.disabled = true;
              }
            }
          }
        
        if(bigBoardState[0]+bigBoardState[1]+bigBoardState[2] == "xxx" || bigBoardState[3]+bigBoardState[4]+bigBoardState[5] == "xxx" || bigBoardState[6]+bigBoardState[7]+bigBoardState[8] == "xxx" || bigBoardState[0]+bigBoardState[3]+bigBoardState[6] == "xxx" || bigBoardState[1]+bigBoardState[4]+bigBoardState[7] == "xxx" || bigBoardState[2]+bigBoardState[5]+bigBoardState[8] == "xxx" || bigBoardState[0]+bigBoardState[4]+bigBoardState[8] == "xxx" || bigBoardState[2]+bigBoardState[4]+bigBoardState[6] == "xxx") {
          document.getElementById("result").innerHTML = "x has won";
          delte();
        }
        else if(bigBoardState[0]+bigBoardState[1]+bigBoardState[2] == "ooo" || bigBoardState[3]+bigBoardState[4]+bigBoardState[5] == "ooo" || bigBoardState[6]+bigBoardState[7]+bigBoardState[8] == "ooo" || bigBoardState[0]+bigBoardState[3]+bigBoardState[6] == "ooo" || bigBoardState[1]+bigBoardState[4]+bigBoardState[7] == "ooo" || bigBoardState[2]+bigBoardState[5]+bigBoardState[8] == "ooo" || bigBoardState[0]+bigBoardState[4]+bigBoardState[8] == "ooo" || bigBoardState[2]+bigBoardState[4]+bigBoardState[6] == "ooo") {
          document.getElementById("result").innerHTML = "o has won";
          delte();
        }
        else if(setTie) {
          document.getElementById("result").innerHTML = "it is tie";
          delte();
        }
        
        
      }
      storeMini = sections[y[0]];
      checkWin();
    })
  }
}