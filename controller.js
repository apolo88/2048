class juego {
    
    constructor(){

        //Initializes the Matrix
        this.matrix = [];
        for(let row = 0; row < dimension; row++){
            this.matrix[row] = [];
            for(let col = 0; col < dimension; col++){
                this.matrix[row][col] = '';
            }
        }
        console.log(dimension);
        this.generateNewNumbers();
    }

    moveRowRight(row){
        for(let i = dimension - 1; i >= 1; i--){
            if(this.matrix[row][i] == ''){
                for(let j = i-1; j >= 0; j--){
                    if(this.matrix[row][j] != ''){
                        this.matrix[row][i] = this.matrix[row][j];
                        this.matrix[row][j] = '';
                        break;
                    }  
                }
            }
        }  

        this.sumRight(row);
    }

    moveRowLeft(row){
        for(let i = 0; i <= dimension - 2; i++){
            if(this.matrix[row][i] == ''){
                for(let j = i+1; j <= dimension - 1; j++){
                    if(this.matrix[row][j] != ''){
                        this.matrix[row][i] = this.matrix[row][j];
                        this.matrix[row][j] = '';
                        break;
                    }
                }
            }
        } 

        this.sumLeft(row);
    }

    moveColUp(col){
        for(let i = 0; i <= dimension - 2; i++){
            if(this.matrix[i][col] == ''){
                for(let j = i+1; j <= dimension - 1; j++){
                    if(this.matrix[j][col] != ''){
                        this.matrix[i][col] = this.matrix[j][col];
                        this.matrix[j][col] = '';
                        break;
                    }
                }
            }
        } 

        this.sumUp(col);
    }

    moveColDown(col){
        for(let i = dimension - 1; i >= 1; i--){
            if(this.matrix[i][col] == ''){
                for(let j = i-1; j >= 0; j--){
                    if(this.matrix[j][col] != ''){
                        this.matrix[i][col] = this.matrix[j][col];
                        this.matrix[j][col] = '';
                        break;
                    }
                }
            }
        } 

        this.sumDown(col);
    }

    sumRight(row){
        for(let i = dimension - 1; i >= 1; i--){
            if(this.matrix[row][i] != ''){
                if(this.matrix[row][i] == this.matrix[row][i-1]){
                    this.matrix[row][i] += this.matrix[row][i-1];
                    for(let j = i-1 ; j >= 1; j--){
                        this.matrix[row][j] = this.matrix[row][j-1];
                        this.matrix[row][j-1] = '';
                    }
                    this.matrix[row][0] = '';
                }
            }
        }
    }

    sumLeft(row){
        for(let i = 0; i <= dimension - 2; i++){
            if(this.matrix[row][i] != ''){
                if(this.matrix[row][i] == this.matrix[row][i+1]){
                    this.matrix[row][i] += this.matrix[row][i+1];
                    for(let j = i+1 ; j <= dimension - 2; j++){
                        this.matrix[row][j] = this.matrix[row][j+1];
                        this.matrix[row][j+1] = '';
                    }
                    this.matrix[row][dimension-1] = '';
                }
            }
        }
    }

    sumUp(col){
        for(let i = 0; i <= dimension - 2; i++){
            if(this.matrix[i][col] != ''){
                if(this.matrix[i][col] == this.matrix[i+1][col]){
                    this.matrix[i][col] += this.matrix[i+1][col];
                    for(let j = i+1 ; j <= dimension - 2; j++){
                        this.matrix[j][col] = this.matrix[j+1][col];
                        this.matrix[j+1][col] = '';
                    }
                    this.matrix[dimension-1][col] = '';
                }
            }
        }
    }

    sumDown(col){
        for(let i = dimension - 1; i >= 1; i--){
            if(this.matrix[i][col] != ''){
                if(this.matrix[i][col] == this.matrix[i-1][col]){
                    this.matrix[i][col] += this.matrix[i-1][col];
                    for(let j = i-1 ; j >= 1; j--){
                        this.matrix[j][col] = this.matrix[j-1][col];
                        this.matrix[j-1][col] = '';
                    }
                    this.matrix[0][col] = '';
                }
            }
        }
    }

    generateNewNumbers(){
        let emptyPositions = [];
        for(let row = 0; row < dimension; row++){
            for(let col = 0; col < dimension; col++){
                if(this.matrix[row][col] == ''){
                    emptyPositions.push([row,col]);
                }
            }
        }

        if(emptyPositions.length > 0){
            let randomIndex = Math.floor(Math.random() * emptyPositions.length);
            this.matrix[emptyPositions[randomIndex][0]][emptyPositions[randomIndex][1]] = 2;
        }
    }

    moveRight(event){
        for(let i = 0; i < 4; i++){
            this.moveRowRight(i);    
        }

        this.generateNewNumbers();
    }

    moveLeft(){
        for(let i = 0; i < 4; i++){
            this.moveRowLeft(i);    
        }

        this.generateNewNumbers();
    }

    moveUp(){
        for(let i = 0; i < 4; i++){
            this.moveColUp(i);    
        }

        this.generateNewNumbers();
    }

    moveDown(){
        for(let i = 0; i < 4; i++){
            this.moveColDown(i);    
        }

        this.generateNewNumbers();
    }
}

let dimension = 4;
let juegoInst = new juego();

window.onload = function(){
    window.addEventListener("keydown", moveByArrow);
    loadMatrix();
};

const moveByArrow = (event) => {
    if(event.keyCode == '37'){
        moveLeft();
    }else if(event.keyCode == '38'){
        moveUp();
    } if(event.keyCode == '39'){
        moveRight();
    } if(event.keyCode == '40'){
        moveDown();
    }
}

const moveRight = () => {
    juegoInst.moveRight();
    loadMatrix();
}

const moveLeft = () => {
    juegoInst.moveLeft();
    loadMatrix();
}

const moveUp = () => {
    juegoInst.moveUp();
    loadMatrix();
}

const moveDown = () => {
    juegoInst.moveDown();
    loadMatrix();
}

const loadMatrix = () => {
    for(let row = 0; row < dimension; row++){
        for(let col = 0; col < dimension; col++){
            let cellElement = document.getElementById('pieza' + row + col);
            cellElement.innerHTML = juegoInst.matrix[row][col];
            cellElement.style = 'background:' + getColour(juegoInst.matrix[row][col]);
        }
    }
}

const getColour = (cellValue) => {
    if(cellValue == 2){
        return 'white';
    }else if(cellValue == 4){
        return 'yellow';
    }else if(cellValue == 8){
        return 'orange';
    }else if(cellValue == 16){
        return 'red';
    }else if(cellValue == 32){
        return 'green';
    }else if(cellValue == 64){
        return 'violet';
    }else if(cellValue == 128){
        return 'purple';
    }else if(cellValue == 256){
        return 'blue';
    }else if(cellValue == 512){
        return 'magenta';
    }else if(cellValue == 1024){
        return 'colar';
    }else if(cellValue == 2048){
        return 'brown';
    }
}