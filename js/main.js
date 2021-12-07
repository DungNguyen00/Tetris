
const _width = 300;
const _heght = 600;
const _col = 10;
const _row = 20;
const _size = 30;

let isEnd = false;

const _nextWidth = 120;
const _nextHeight = 100;
const _nextCol = 6;
const _nextRow = 5;
const _nextSize = 20;

const _ = null;
const x = 'x';
const _colorBoard = 'grey';
const _colorBlock = 'black';
const  index = 0;
const music5 = new Audio('audio/TetrisGame.mp3');


//hình khối
const _BaseTetromino = [
    [
        [x,x,x]
    ],
    [
        [x,x,x],
        [_,_,x]
    ],
    [
        [_,_,x],
        [x,x,x]
    ],
    [
        [x,x],
        [x,x]
    ],
    [
        [x,x,_],
        [_,x,x]
    ],
    [
        [_,x,x],
        [x,x,_]
    ],
    [
        [x,x,x],
        [_,x,_]
    ]
];



// document.console.log('fjdshjkf');

class block{
    constructor(game, col, row, color){
        console.log('tao tetromino');
        this.game = game;
        this.col = col;
        this.row = row;
        this.color = color;
    }
// Vẽ khối chính
    drawMain(){
        let _x = this.col * _size;
        let _y = this.row * _size;
        this.game.context.beginPath();
        this.game.context.strokeStyle = this.color;
        this.game.context.rect(_x,_y,_size,_size);
        this.game.context.stroke();
        this.game.context.fillStyle = this.color;
        this.game.context.fillRect(_x + 2,_y + 2,_size - 4,_size -4);
    }

    // vẽ khối mini tiếp theo
    drawNext(){
        let _x = this.col * _nextSize;
        let _y = this.row * _nextSize;
        this.game.minContext.beginPath();
        this.game.minContext.strokeStyle = this.color;
        this.game.minContext.rect(_x, _y, _nextSize, _nextSize);
        this.game.minContext.stroke();

        this.game.minContext.fillStyle = this.color;
        this.game.minContext.fillRect(_x + 2, _y + 2, _nextSize - 4, _nextSize -4);
        
    }
    // giới hạn bên trái

    // kiểm tra chạm sang trái
    canMoveLeft(){
        if(!(this.col === 0) && this.game.board.emptyCell(this.col -1, this.row)){
            return true;
        }
        return false;
    }
    // cho sang trái
    moveLeft(){
        if(this.canMoveLeft()){
            this.col--;
        }
       
    }
    // giới hạn bên phải
    // kiểm tra chạm bên phải
    canMoveRight(){
        if(!(this.col === _col -1) && this.game.board.emptyCell(this.col+1, this.row)){
            return true;
        }else{
            return false;
        }
    }
    // cho sang phải
    moveRight(){
        if(this.canMoveRight()){
             this.col++
        }
    }
    // giới hạn đáy
    // kiểm tra chạm đáy
    canMoveDown(){
        if(!(this.row === _row -1) && this.game.board.emptyCell(this.col, this.row +1)){
            return true;
        }else{
            return false;
        }
    }
    // cho rơi
    fall(){
        if(this.canMoveDown()){
              this.row ++;
        }
    } 
}

class board{
    constructor(game){
        this.game = game;
        this.level = 0;
        this.score = 0;
        this.data = this.veBang1();
                // bảng mini tiếp theo
                var arrnext = Array(_nextRow).fill(0).map(x => Array(_nextCol).fill(0))
                for(let i = 0; i <_nextRow; i++){
                    for(let j = 0; j <_nextCol; j++){
                        arrnext[i][j] = _ ;
                    }
                }
                this.minData = arrnext;
            }
            
            
            // bảng chính
            veBang1(){
                var arrmain = Array(_row).fill(0).map(x => Array(_col).fill(0))
                for(let i = 0; i <_row; i++){
                    for(let j = 0; j <_col; j++){
                        arrmain[i][j] = _ ;
                    }
                }
                return arrmain;
            }
            
            // vẽ lại bảng mini tiếp theo
    resetNextBoard(){
        for(let r = 0; r < this.minData.length;r++){
            for(let c = 0; c <this.minData[0].length;c++){
                this.minData[r][c] = _;
            }
        }
    }
    // vẽ 2 bảng
    drawBoard(){
        this.drawMainScreen();
        this.drawMinScreen();
    }

    // vẽ khối gạch trên bảng chính
    drawMainScreen(){
    
        let const1 = document.getElementById('txt_score').value;
        let result = document.getElementById('txt_level').value;
        for(let r = 0; r < this.data.length;r++ ){
            for(let c = 0; c < this.data[0].length; c++){
                let cl = _colorBoard;
                switch (result) {
                    case '1':
                        this.data[9][5] = _;
                        this.data[13][6] = _;
                        this.game.up_level = 1200;
                        break;
                    case '2':
                        this.data[9][5] = x;
                        this.data[13][6] = _;
                        if(const1 >=1){
                            if(const1 >=5){
                                this.data[10][5]= _;
                                break;
                            }
                            this.data[10][5]= _;
                            break;
                        }
                            this.game.up_level =1000;
                        break;
                    case '3':
                        // clearInterval(this.game.status);
                        this.data[9][5] = x;
                        this.data[10][5]= _;
                        this.data[13][6] = x;
                        this.data[14][6] = _;
                        this.data[12][3] = _;
                        if(const1 >=10){
                            if(const1 >=1){
                                this.data[10][5]= _;
                                this.data[14][6] = _;
                                break;
                            }
                            this.data[10][5]= _;
                            this.data[14][6] = _;
                            break;
                        }
                      
                    this.game.up_level =800;
                    // alert(this.index);
                        break;
                    case '4':
                        this.data[9][5] = x;
                        this.data[10][5]= _;
                        this.data[13][6] = x;
                        this.data[14][6] = _;
                        this.data[12][3] = x;
                        this.data[12][9] = _;
                        if(const1 >=15){
                            if(const1 >=1){
                                this.data[10][5]= _;
                                this.data[14][6] = _;
                                this.data[13][3] = _;
                                break;
                            }
                            this.data[10][5]= _;
                            this.data[14][6] = _;
                            this.data[13][3] = _;
                            break;
                        }
           
                    this.game.up_level = 600;
                    // alert(this.index);
                        break;
                    case '5':
                        this.data[9][5] = x;
                        this.data[13][6] = x;
                        this.data[12][3] = x;
                        this.data[12][9] = x;
                        this.data[10][5]= _;
                        this.data[14][6] = _;
                        this.data[13][3] = _;
                        if(const1 >=20){
                            if(const1 >=1){
                                this.data[10][5]= _;
                                this.data[14][6] = _;
                                this.data[13][3] = _;
                                this.data[13][9] = _;
                                break;
                            }
                            this.data[10][5]= _;
                            this.data[14][6] = _;
                            this.data[13][3] = _;
                            this.data[13][9] = _;
                            break;
                        }

                        
                    this.game.up_level = 400;
                        break;
                    default:
                        this.data[9][5] = x;
                        this.data[13][6] = x;
                        this.data[12][3] = x;
                        this.data[12][9] = x;
                        break;
                }
                // this.index += 1;
                if(this.data[r][c] === x){
                    cl = _colorBlock;
                }
                let bl = new block(this.game, c, r, cl);
                bl.drawMain();
            }
        }
    }

    // vẽ khối trên bảng mini tiếp theo
    drawMinScreen(){
        // this.colorTetromino = ['red', 'yellow', 'black', 'orange', 'blue','pink', 'purple']
        let index = Math.floor(Math.random() * 7);
        for(let r = 0; r < this.minData.length;r++ ){
            for(let c = 0; c < this.minData[0].length; c++){
                let cl = _colorBoard;
                if(this.minData[r][c] === x){
                    cl = _colorBlock;
                }
                let bl = new block(this.game, c, r, cl);
                bl.drawNext();
            }
        }
    }
// gán rỗng tại vi trí cột c hàng r
    emptyCell(c, r){
        return this.data[r][c] === _;
    }
// kiểm tra hàng full chưa
    checkFullBoard(r){
        let isFull = true;
        for(let c = 0; c < this.data[r].length; c++){
            if(this.data[r][c] === _){
                isFull = false;
                break;
            }
        }
        return isFull;
    }
    checkNumberfull(r){
        let number = 0;
        for(let c = 0; c < this.data[r].length; c++){
            if(this.data[r][c] === x){
                number +=1;
            }
        }
        if(number = 1){
            for(let c = 0; c < this.data[r].length; c++){
                this.data[9][5] = _;
                this.data[13][6] = _;
                this.data[12][3] = _;
                this.data[12][9] = _;
                number = 0;
            }
        }
        if(number = 2){
            this.data[9][5] = _;
            this.data[13][6] = _;
            this.data[12][3] = _;
            this.data[12][9] = _;
            this.data[10][5] = _;
            this.data[14][6] = _;
            this.data[13][3] = _;
            this.data[13][9] = _;
        }
    }
    // kiểm tra chạm đỉnh
    checkEndGame(){
        let endGame = false;
        for(let r = 0; r <this.data[0].length; r++){
            if(this.data[0][r] === x){
                endGame = true;
                break;
            }
        }
        return endGame;
    }
    // xóa hàng full theo hàng rỗng vào
    updateBoard(){
        if(this.checkEndGame() && !isEnd){
            isEnd = true;
            clearInterval(this.game.status);
            document.getElementById('btnStart').disabled = 'true';
            // document.getElementById('btnPlay').disabled = 'true';
            document.getElementById('over').style.display = 'block';
            document.getElementById('diem').value = 'Điểm số của bạn là: ' + this.score;
        }
        for(let r = 0; r < _row; r++){
            if(this.checkFullBoard(r)){
                this.data.splice(r,1);
                this.data.unshift([_,_,_,_,_,_,_,_,_,_]);
                this.checkNumberfull(r);
                this.level +=1;
                this.score +=1;
            }
            document.getElementById('txt_score').value = this.score;
            //   this.game.up_level = Math.floor(1000 - (this.result * 200));
            
            // tăng level  
            if(Math.floor(this.level/5)){
                this.game.up_level -=200;
                this.level = 0;
                clearInterval(this.game.status);
                this.game.status = this.game.startGame();
                this.updateBoard();
            }
            
        }
        
            document.getElementById('txt_level').value = Math.floor((1400 - this.game.up_level )/200) ;

        // let result = Math.floor((1000- this.game.up_level)/200);
        // s
    }

}

class Tetromino{
    constructor(game, col, row){
        this.game = game;
        this.col = col;
        this.row = row;
        this.data = [];
        this.blocks = [];
        this.randomTetromino();
    }
    // tạo ngẫu nhiên viên gạch mới
    randomTetromino(){
        this.data = [];
        let index = Math.floor(Math.random() * 7);
        this.data = _BaseTetromino[index];
        // this.data.fillStyle = this.colorTetromino[index];\
        // for()
        // _BaseTetromino[index].fillStyle = this.colorTetromino[index];
    }
    // vẽ xây khối gạch vào bảng
    buildTetromino(){
        // this.colorTetromino = ['red', 'yellow', 'black', 'orange', 'blue','pink', 'purple']
        this.blocks = [];
        // this.data = [];
        let index = Math.floor(Math.random() * 7);
        // this.data = _BaseTetromino[index];
        for(let r = 0; r <this.data.length; r++){
            for(let c = 0; c <this.data[0].length; c++){
                if(this.data[r][c] === x){
                    let bl = new block(this.game, this.col +c, this.row + r, _colorBlock);
                    this.blocks.push(bl);
                }
            }
        }
    }

    // ve doi tuong tiep theo
    drawTetrominoToNextScreen(){
        this.game.board.resetNextBoard();
        for(let r = 0; r < this.data.length; r++){
            for(let c = 0; c < this.data[0].length; c++){
                if(this.data[r][c] === x){
                      this.game.board.minData[r+1][c+1] = x;
                }
            }
        }
    }
    // tự vẽ khối tiếp theo khi khối trước chạm đáy
    drawTetrominoMainScreen(){
        this.buildTetromino();
        this.blocks.forEach((bl) => bl.drawMain());
    }

    //xoay viên gạch
    rotateTetromino(){
        let _newTetromino = [];
        for(let c = 0; c < this.data[0].length; c++){
            let _r = [];
            for(let r = this.data.length - 1; r>= 0; r--){
                _r.push(this.data[r][c]);
            }
            _newTetromino.push(_r)
        }

        let oldCol = this.col;
        if((this.col + _newTetromino[0].length) > _col-1){
            this.col = _col - _newTetromino[0].length; 
        }
        let canRotate = true;
        if((this.row + _newTetromino.length) < _row ){
            for(let r = 0; r< _newTetromino.length; r++){
                for(let c = 0; c <_newTetromino[0].length; c++){
                    if(_newTetromino[r][c] === x){
                        if(!this.game.board.emptyCell(this.col +c, this.row + r)){
                            canRotate = false;
                            break;
                        }
                    }
                }
            }
        }else{
            canRotate = false;
        }
        if(canRotate){
            this.data = _newTetromino;
        }else{
            this.col = oldCol;
        }
        this.buildTetromino();
    }
    //khối gạch chạm cạnh phải
    canMoveRight(){
        let canMoveRight = true;
        for(let i = 0; i < this.blocks.length; i++){
            // kiểm tra va chạm bên phải
            if(!this.blocks[i].canMoveRight()){
                canMoveRight = false;
                break;
            }
        }
        return canMoveRight;
    }
    // tăng vị trí sang phải khi chưa có va chạm và vẽ lại khối gạch
    moveRight(){
        if(this.canMoveRight()){
            this.col++;
            this.buildTetromino();
        }
    }
    // khối gạch chạm cạnh trái
    canMoveLeft(){
        let canMoveLeft = true;
        for(let i = 0; i < this.blocks.length; i++){
            // kiểm tra va chạm bên trái
            if(!this.blocks[i].canMoveLeft()){
                canMoveLeft = false;
                break;
            }
        }
        return canMoveLeft;
    }
    // tăng vị trí sang trái khi chưa có va chạm và vẽ lại khối
    moveLeft(){
        if(this.canMoveLeft()){
            this.col--;
            this.buildTetromino();
        }
    }
    //kiểm tra chạm đáy
    canfall(){
        let canfall = true;
        for(let i = 0; i < this.blocks.length; i++){
            // kiểm tra va chạm đáy
            if(!this.blocks[i].canMoveDown()){
                canfall = false;
                break;
            }
        }
        return canfall;
    }
    // nếu chưa va chạm thì tiếp tục rơi xuống
    fall(){
        if(this.canfall()){
             this.row++;
             this.buildTetromino();
        }else{
            // ngược lại gán vị trí khối rơi bằng x,
            // xóa hàng nếu hàng full x,
            // chạy khối tiếp theo
            // tạo khối tiếp theo
            this.appendToBoard();
            this.game.board.updateBoard();
            this.game.startNextTetromino();
            this.game.createNextTetromino();
        }
    }

    // chưa chạm đáy thì tiếp tục rơi
    down(){
        while(this.canfall()){
            this.fall();
        }
    }
    // gán vị trí khối gạch tại đáy bằng x
    appendToBoard(){
        for(let i = 0; i < this.blocks.length; i++){
            let c = this.blocks[i].col;
            let r = this.blocks[i].row;
            this.game.board.data[r][c] = x;
        }
    }
}

class game{
    
    constructor(){
        // console.log("khoi tao game");
        this.canvas = null;
        this.context = null;

        this.minCanvas = null;
        this.minContext = null;

        this.btnStart = null;
        this.status = null;
        this.up_level = 1200;
        this.init();
        this.eventListener();
        this.loop();

    }

    //sự kiện bàn phím
    eventListener(){
        document.addEventListener('keydown', (event) =>{
            if(this.status != null){
                    switch (event.key) {
                    case 'ArrowLeft':
                        this.Tetromino.moveLeft();
                        break;
                    case 'ArrowRight':
                        this.Tetromino.moveRight();
                        break;
                    case 'ArrowDown':
                        this.Tetromino.down();
                        break;
                    case 'ArrowUp':
                        this.Tetromino.rotateTetromino();
                        break;
                    default:
                        break;
                };
            }
            
        });
        // nút start
        this.btnStart.addEventListener('click', (event) =>{
            let status = event.srcElement.attributes.status.value;
            switch (status) {
                case 'start':
                    document.getElementById('left').disabled = 'true';
                    document.getElementById('right').disabled = 'true';
                    music5.play();
                    this.status = this.startGame();
                    this.btnStart.attributes.status.value = 'stop';
                    this.btnStart.value = "STOP";
                    break;
            case 'stop':
                document.getElementById('left').disabled = 'false';
                    document.getElementById('right').disabled = 'false';
                    clearInterval(this.status);
                    this.status = null;
                    this.btnStart.attributes.status.value = 'start';
                    this.btnStart.value = "START";
                    break;
                default:
                    break;
            }


        });
        // new game mới
        this.btnPlay.addEventListener('click', (event1) =>{
            location.reload();    
        });

        // let volume1 = true;
        this.btnVolume1.addEventListener('click', (event) =>{
            music5.play();
            
        } );
        this.btnVolume2.addEventListener('click', (event) =>{
            music5.pause();
            
        } );
        this.play.addEventListener('click', (event) =>{
            location.reload();
        });
        this.exit.addEventListener('click', (event) =>{
            document.getElementById('over').style.display = 'none';
            document.getElementById('btnStart').disabled = 'false';
            // document.getElementById('btnPlay').disabled = 'false';
        })
    }
    init(){
        this.play = document.getElementById('play');
        this.exit  =document.getElementById('exit');
        this.btnStart = document.getElementById('btnStart');
        this.btnPlay = document.getElementById('btnPlay');
        this.btnVolume1 = document.getElementById('volume1');
        this.btnVolume2 = document.getElementById('volume2');
        // tao canvas chinh
        this.canvas = document.createElement('canvas');
        this.canvas.width = _width;
        this.canvas.height = _heght;
        this.context = this.canvas.getContext('2d');
        document.getElementById('mainScreen').appendChild(this.canvas)
        
        // tao canvas next
        this.minCanvas = document.createElement('canvas');
        this.minCanvas.width = _nextWidth;
        this.minCanvas.height = _nextHeight;
        this.minContext = this.minCanvas.getContext('2d');
        document.getElementById('nextScreen').appendChild(this.minCanvas)


        this.board = new board(this);
        // this.board.levelMan();
        this.board.drawBoard();
        
        let rd = Math.floor(Math.random()*4)
        this.Tetromino = new Tetromino(this,rd,0);
        this.Tetromino.drawTetrominoMainScreen();
        this.nextTetromino = new Tetromino(this, rd,0);
        this.nextTetromino.drawTetrominoToNextScreen();

    }
    // tạo khối gạch bên bảng tiếp theo
    createNextTetromino(){
        let rd = Math.floor(Math.random()*4)
        this.nextTetromino = new Tetromino(this, rd,0);
        this.nextTetromino.drawTetrominoToNextScreen();
    }
    // chạy khối tiếp theo
    startNextTetromino(){
        this.Tetromino = this.nextTetromino;
    }
    // thời gian rơi mỗi viên gạch
    startGame(){
        return setInterval(() => {
            this.Tetromino.fall();
            // this.block.fall();
        },this.up_level);
    }
    // xóa toàn bộ trong bảng chính
    clearScreen(){
        this.context.clearRect(0,0,_width, _heght);
        this.board.drawBoard();
        // this.board.levelMan();
    }

    // xóa gạch
    draw(){
        this.clearScreen();

        this.Tetromino.drawTetrominoMainScreen();
        // this.block.drawMain();
    }
    // quá trình xóa lặp lại sau
    loop(){
        this.draw();
        setTimeout(() => this.loop(), 20);
    }
    
}
var g = new game();

