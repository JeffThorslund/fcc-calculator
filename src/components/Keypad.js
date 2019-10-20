import React from 'react'
import  './Keypad.css'

class Keypad extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            
            numberDic: //innerHTML:id
                {
                    0:"zero",
                    1:"one",
                    2:"two",
                    3:"three",
                    4:"four",
                    5:"five",
                    6:"six",
                    7:"seven",
                    8:"eight",
                    9:"nine"
                },

            operatorDic: //innerHTML:id
                {
                    "+":"add",
                    "-":"subtract",
                    "/":"divide",
                    "*":"multiply"
                },
            
            numberArray:[], //used as an intermediate during construction
            equation: [], //used to hold the array of floats and operators, the full equation
            currentAnswer: 0, //set when equation is evaluated
        }

        this.handleNumClick = this.handleNumClick.bind(this)
        this.handleDecClick = this.handleDecClick.bind(this)
        this.handleCleClick = this.handleCleClick.bind(this)
        this.handleOpeClick = this.handleOpeClick.bind(this)
        this.handleEquClick = this.handleEquClick.bind(this)
    }

    handleNumClick(e){
        let numArray = [...this.state.numberArray]
        
        numArray.push(e.currentTarget.innerHTML) //pushes number to numArray
        
        if (numArray[0]==='0'){ //immidiately deletes first number if its a 0
            numArray.shift();
        }
        
        this.setState({
            numberArray: numArray,
            currentAnswer: numArray,
        })
    }

    handleDecClick(){
        let numArray = [...this.state.numberArray]
        let decimalExist = false

        for (let item in numArray){ //interates array, checking for a decimal
            if(/[.]/.test(numArray[item])){
            decimalExist = true;
            }
        }

        if (decimalExist===false){ //if no decimal present, push a '.'
            numArray.push('.')
            
        }

        if(numArray[0]==='.'){ //adds a 0 to beginning if the first thing is a decimal
            numArray.unshift(0)
        }

        this.setState({
            numberArray: numArray,
            currentAnswer: numArray,
        }) //pushes changes to state
    }

    handleOpeClick(e){
        
        
        let myEquation = [...this.state.equation]
        let number = [...this.state.numberArray]

        //handle 2 operators in a row

        

            if (number.length>0){
                myEquation.push(number.join(''))
                myEquation.push(e.currentTarget.innerHTML)
            }

            else if(number.length===0 && myEquation.length===1) {
                myEquation.push(e.currentTarget.innerHTML)
            }

            else{
                myEquation[myEquation.length-1]=e.currentTarget.innerHTML
            }


        

        this.setState({
            equation:myEquation,
            numberArray:[],
            currentAnswer: e.currentTarget.innerHTML
        })
    }

    handleCleClick(){
        
        this.setState({
            numberArray:[],
            equation: [],
            currentAnswer: 0
        })
    }

    handleEquClick(){
        let numArray = [...this.state.numberArray]
        let number = numArray.join('')
        let myEquation = [...this.state.equation]
        
        if (number>0){
            myEquation.push(number)//this and above pushes current num to equation
        }

       

        let answer = this.state.currentAnswer

        answer = myEquation[0]

        for (let i = 1; i<myEquation.length-1; i=i+2){

            switch (myEquation[i]){
                case "+":
                    answer = Number(answer) + Number(myEquation[i+1])
                    break;
                
                case "-":
                    answer = Number(answer) - Number(myEquation[i+1])
                    break;

                case "*":
                    answer = Number(answer) * Number(myEquation[i+1])
                    break;  

                case "/":
                        answer = Number(answer) / Number(myEquation[i+1])
                        break;

                default:
                    console.log('that is bad')
                    break;
            
            }


            
           
        }

       this.setState({
            equation:[answer],
            currentAnswer: answer,
            numberArray:[]
        })

        

    }
    



    


    render () {

        let numbers=[]; //creates the numbers
        let numberKeys=Object.keys(this.state.numberDic)
        let numberValues=Object.values(this.state.numberDic)

        for (let i=0; i<9; i++){
            numbers.push(
                <div id={numberValues[i]} className='grid-child' onClick={this.handleNumClick}>
                    {numberKeys[i]}
                </div>
            )
        }

        let operators = []; //creates the operators
        let operatorKeys = Object.keys(this.state.operatorDic);
        let operatorValues = Object.values(this.state.operatorDic)

        for (let i=0; i<4; i++){
            operators.push(
                <div id={operatorValues[i]} className='grid-child' onClick={this.handleOpeClick}>
                    {operatorKeys[i]}
                </div>
            )
        }

        return (
            <div>
            <div id = 'grid-container'>
                {numbers}
                {operators}

                <div id="clear" className='grid-child' onClick={this.handleCleClick}>
                    clear
                </div>

                <div id="equals" className='grid-child' onClick={this.handleEquClick}>
                    =
                </div>

                <div id="decimal"  className='grid-child' onClick={this.handleDecClick}>
                    .
                </div>

                <div id='equation' className='grid-child'>
                    {this.state.equation}
                </div>

                <div id='display' className='grid-child'>
                    {this.state.currentAnswer}
                </div>

               

            </div>

                <div id='info'>
                    Number Array = {this.state.numberArray}<br/>
                    Equation = {this.state.equation}<br/>
                    Answer = {this.state.currentAnswer}
                </div>

            </div>
        )
    } 
}

export default Keypad;