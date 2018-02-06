import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  moves: Array<MovePair> = [];

  afterLose: Array<Decision> = [];
  afterDraw: Array<Decision> = [];
  afterWin: Array<Decision> = [];
  afterAll: Array<Decision> = [];

  counts = [0, 0, 0];

  Move = Move;
  Result = Result;

  constructor() {
    // let moves: Array<MovePair>;
    // {
    //   moves = [{'myMove': 2, 'hisMove': 0}, {'myMove': 1, 'hisMove': 0}, {'myMove': 2, 'hisMove': 0}, {
    //     'myMove': 1,
    //     'hisMove': 1
    //   }, {'myMove': 2, 'hisMove': 0}, {'myMove': 1, 'hisMove': 1}, {'myMove': 2, 'hisMove': 2}, {'myMove': 1, 'hisMove': 1}, {
    //     'myMove': 0,
    //     'hisMove': 0
    //   }, {'myMove': 1, 'hisMove': 0}, {'myMove': 0, 'hisMove': 0}, {'myMove': 0, 'hisMove': 0}, {'myMove': 1, 'hisMove': 2}, {
    //     'myMove': 1,
    //     'hisMove': 2
    //   }, {'myMove': 0, 'hisMove': 2}, {'myMove': 0, 'hisMove': 1}, {'myMove': 2, 'hisMove': 2}, {'myMove': 2, 'hisMove': 0}, {
    //     'myMove': 1,
    //     'hisMove': 0
    //   }, {'myMove': 0, 'hisMove': 2}, {'myMove': 2, 'hisMove': 0}, {'myMove': 1, 'hisMove': 2}, {'myMove': 0, 'hisMove': 0}, {
    //     'myMove': 1,
    //     'hisMove': 2
    //   }, {'myMove': 2, 'hisMove': 0}, {'myMove': 2, 'hisMove': 2}, {'myMove': 1, 'hisMove': 0}, {'myMove': 2, 'hisMove': 0}, {
    //     'myMove': 2,
    //     'hisMove': 2
    //   }, {'myMove': 1, 'hisMove': 1}, {'myMove': 2, 'hisMove': 2}, {'myMove': 2, 'hisMove': 1}, {'myMove': 1, 'hisMove': 0}, {
    //     'myMove': 0,
    //     'hisMove': 2
    //   }, {'myMove': 0, 'hisMove': 1}, {'myMove': 0, 'hisMove': 2}, {'myMove': 2, 'hisMove': 0}, {'myMove': 2, 'hisMove': 2}, {
    //     'myMove': 1,
    //     'hisMove': 0
    //   }, {'myMove': 2, 'hisMove': 2}, {'myMove': 2, 'hisMove': 0}];
    // }
    //
    // moves.forEach(move => this.addMove(move.myMove, move.hisMove));
  }

  addMove(myMove: Move, hisMove: Move) {
    if (myMove == undefined || hisMove == undefined) {
      return;
    }

    let lastMove = {
      myMove: myMove,
      hisMove: hisMove
    };
    this.moves.push(lastMove);

    if (this.moves.length > 1) {
      this.addStat(this.moves[this.moves.length - 2], lastMove);
    }

    this.counts[hisMove]++;
    console.log(`My move: ${Move[lastMove.myMove]}, His move: ${Move[lastMove.hisMove]}`);
  }

  addStat(previousMove: MovePair, lastMove: MovePair) {
    let previousResult = this.getResult(previousMove.myMove, previousMove.hisMove);
    let resultHimself = this.getResult(lastMove.hisMove, previousMove.hisMove);
    let result = this.getResult(lastMove.hisMove, lastMove.myMove);
    let decision = {
      resultHimself: resultHimself,
      result: result,
      move: lastMove.hisMove
    };

    switch (previousResult) {
      case Result.DRAW: {
        this.afterDraw.push(decision);
        break;
      }
      case Result.LOST: {
        this.afterWin.push(decision);
        break;
      }
      case Result.WIN: {
        this.afterLose.push(decision);
        break;
      }
    }
    this.afterAll.push(decision);
  }

  getResult(move1: Move, move2: Move): Result {
    switch ((move1 - move2 + 3) % 3) {
      case 1:
        return Result.WIN;
      case 2:
        return Result.LOST;
      case 0:
        return Result.DRAW;
    }
  }

  getMessage(result: Result) {
    switch (result) {
      case Result.WIN: {
        return 'Tried to win himself';
      }
      case Result.LOST: {
        return 'Tried to lose himself';
      }
      case Result.DRAW: {
        return 'Tried to play the same';
      }
    }
  }

  clear() {
    this.moves = [];
    this.afterLose = [];
    this.afterDraw = [];
    this.afterWin = [];
  }
}

enum Move {
  ROCK,
  PAPER,
  SCISSORS
}

interface MovePair {
  myMove: Move;
  hisMove: Move;
}

enum Result {
  WIN,
  DRAW,
  LOST
}

interface Decision {
  resultHimself: Result;
  result: Result;
  move: Move;
}
