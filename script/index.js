import GameTree from './Game.js';
import Search from './Search.js';

let board = ['', '', '', '', '', '', '', '', ''];
let btnReset = document.querySelector('button');
let cells = document.querySelectorAll('.cell');

let humanPlayer = 'X';
let aiPlayer = 'O';
let flag = true;


btnReset.addEventListener('click', resetBoard);
cells.forEach(cell => {
  cell.addEventListener('click',makeMove);
});

function makeMove(event) {
  if(flag){
    let move = event.target.getAttribute('celula');
    if (board[move] === '') {
      flag = false;
      board[move] = humanPlayer;
      event.target.innerText = humanPlayer;
      setTimeout(function() {
        if(checkWin(humanPlayer)){
          moveIA();
        }
      }, 700);
    }
  }
}

function fail(){
  let count = 0;
  for (let index = 0; index < board.length; index++) {
    if(board[index] === ''){
      count++;
    }    
  }
  return count <= 0;
}

function moveIA() {
  let allPossibilities  = new GameTree(board);
  let aiMoves = Search.bestChoice(allPossibilities .raiz, aiPlayer);
  let nextMove;
  while(aiMoves.destino != null){
    nextMove = aiMoves.raiz.tabuleiro;
    aiMoves = aiMoves.destino;
  }
  if(nextMove != null){
    for (let index = 0; index <= nextMove.length; index++) {
      if(nextMove[index] !== board[index]){
        cells[index].innerText = nextMove[index];
      }
    }
    board = nextMove;
  }
  setTimeout(function() {
    checkWin(aiPlayer);
    flag = true;
  }, 700);
}

function showMessage(value) {
    alert('Jogador ' + value + ' ganhou!');
    resetBoard();
}

function checkWin(value) {
  for (let i = 0; i < 3; i++) {
    if (
      (board[i * 3] !== '' && board[i * 3] === board[i * 3 + 1] && board[i * 3] === board[i * 3 + 2]) ||
      (board[i] !== '' && board[i] === board[i + 3] && board[i] === board[i + 6])
    ) {
      showMessage(value);
      return false;
    }
  }
  if (
    (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) ||
    (board[2] !== '' && board[2] === board[4] && board[2] === board[6])
  ){
    showMessage(value);
    return false;
  }
  if(fail()){
    showMessage('V');
    return false;
  }
  return true;
}

function resetBoard() {
  board = ['', '', '', '', '', '', '', '', ''];
  flag = true;
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
  }
}