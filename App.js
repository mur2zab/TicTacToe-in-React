import React, { Component } from 'react';
// import style from  './css/style.css';



class App extends React.Component{
    render(){
        return(
            <div >
                <Board/>
            </div>
        );
    } 
}


function Square(props){
    if(props.value == "X"){
        return(
            <button className="square-design text-color-X" 
                onClick={()=>props.onClick()}
            >
            {props.value}
            </button>
        );
    }else{
        return(
            <button className="square-design text-color-O"
                onClick={()=>props.onClick()}
            >
            {props.value}
            </button>
        );
    }
}

class Board extends React.Component{
    renderSquare(i){
        return (<Square  value ={this.state.squares[i]} onClick= {() =>this.handleClick(i)}/>
        );
    }

    handleClick(i){
        const squares = this.state.squares.slice();
        if (winningSequence(squares) ) {
            this.setState({
                squares:squares.fill(null),
            })
            return;
          }
          if(squares[i]){return;}
        squares[i] =this.state.xTurn?"X":"O";
        if(squares[i] == "x"){
           this.setState({text:"x"}) 
        }else{
            this.setState({text:"o"})
        }
        this.setState({squares:squares});
        this.state.xTurn= !this.state.xTurn
    }

    constructor(props){
        super(props);
        this.state ={
            squares:Array(9).fill(null),
            xTurn:false,
            text: "x",

        };
    }

    render(){  
        let res = winningSequence(this.state.squares)
        if(res){
            if(res == 'draw'){
                status = "The Game is a Draw"
            }else
                status = "The Winner Is "+(this.state.xTurn?"O":"X");
        }else{
            status = "Next player: "+(this.state.xTurn?"X":"O");
        }
        return(
            
            <div >
                <h1 >{status}</h1>
                <div className="row-margin">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                <br/>
                </div>
                <div className="row-margin">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                </div>
                <br/>
                <div className="row-margin">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

function checkSquareValues(square){
    var flag = true;
    for(let i = 0;i< square.length; i++){
        if(!square[i]){
            flag = false;
        }
    }
    return flag;
}

function winningSequence(square){

    const lines= [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8],
    ];

    for(let i=0;i<lines.length;i++){
        const [a,b,c] = lines[i];
        console.log(a,b,c);
        if(square[a] && square[a] === square[b] && square[c] === square[a]){
            return square[a]
        }
    }
    if(checkSquareValues(square)){
        return "draw";
    }else{
        return null
    }
}

export default App;