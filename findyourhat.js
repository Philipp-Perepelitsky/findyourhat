const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(a){
    this._field = a;
    this._status = 0;
    this._position = [0,0];
    this._height = a.length;
    this._width = a[0].length;
  }
  get field(){return this._field};
  get status(){return this._status};
  get position(){return this._position};
  get height(){return this._height};
  get width(){return this._width};
  print(){
    this._field.forEach(r => {console.log(r.join(''))});
    }
  promptUser(){
    let m = '';
    if (this._status === 0){
     m = 'Choose a direction. (up: u, down: d, left: l, right: r)';
     this.print();
      };
    if (this._status === 1){
      const m1 = 'Careful! You wandered off the grid. Would you like to';
      console.log(m1);
      m =  'play again? (yes:y no:n)'
      }
    if (this._status === 2){
      const m1 = 'Oops! You stepped into a hole. Would you like to play'
      console.log(m1);
      m = 'again? (yes:y no:n)'
    }
    if (this._status === 3){
      const m1 = 'Congratulations! You found the hat! Would you like to';
      console.log(m1); 
      m = 'play again? (yes:y no:n)';
    }
    const r = prompt(m);
    return r;
  }
  move(d){
    if (d === 'u'){this._position[0] -= 1};
    if (d === 'd'){this._position[0] += 1};
    if (d === 'l'){this._position[1] -= 1};
    if (d === 'r'){this._position[1] += 1};
    if (this._position[0] < 0 || this._position[0] >= this._height || this._position[1] < 0 || this._position[1] >= this._width){
      this._status = 1
      return};
    const c = this._field[this._position[0]][this._position[1]];
    if (c === '0'){this._status = 2};
    if (c === '^'){this._status = 3};
    if (c === fieldCharacter){
      this._field[this._position[0]][this._position[1]] = '*';
    };
  }
  play(){
    let r = '';
    while (r != 'y' && r != 'n'){
      r = this.promptUser();
      this.move(r);
    };
    return r;
  }
  static generateField(h, w){
    let a = [];
    for (let i = 0; i < h; i++){
      let b = [];
      for (let j = 0; j < w; j++){
        const k = Math.floor(Math.random()*1.5);
        if (k === 0){b.push(fieldCharacter)};
        if (k === 1){b.push('0')};
      }
      a.push(b);
    }
    a[0][0] = '*';
    const i = Math.floor(Math.random()*(h-1)) + 1;
    const j = Math.floor(Math.random()*(w-1)) + 1;
    a[i][j] = '^';
    return a;
  }
};

let a = [['*',fieldCharacter, '0'],
           [fieldCharacter,'0', fieldCharacter],
           [fieldCharacter, '^', fieldCharacter]];


let r = 'y';
while (r === 'y'){
  a = Field.generateField(10,10);
  f = new Field(a);
  r = f.play();
};