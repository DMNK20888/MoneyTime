import React from "react";

function CompoundCalculator() {
  function calculate() {
    let amount = document.getElementById("amount");
    let percent = document.getElementById("return");
    let years = document.getElementById("years");
    var result = document.getElementById('answer')

    let answer = amount.value*Math.pow(((percent.value*0.01)+1.00),years.value);
    answer = answer.toFixed(2); //shorten to two decimal places
    answer = addCommas(answer); //add commas at every thousands place
    result.innerHTML = ' $'+answer; 
  }

  function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

    return(

        <div id="compoundBox">
            <div className="inputBox">
                <h2 id="componentTitle">Compound Interest Calculator</h2>
                <div className="inputContainer">
                  <div className="myInput">
                    <label>Starting Amount: </label>
                    <input type="text" id="amount" className="textInput" placeholder="Enter Amount"/>
                  </div>
                  <div className="myInput">
                    <label>Return: </label>
                    <input type="text" id="return" className="textInput" placeholder="Enter Percent"/>
                  </div>
                  <div className="myInput">
                    <label>Time to Grow: </label>
                    <input type="text" id="years" className="textInput" placeholder="Enter Years"/>
                  </div>
                  <button id="submit" onClick={calculate}>{'Submit >>'}</button>
                  
                </div>
                <div className="resultBox">
                  <p>This investment will be worth: </p><p id="answer"> </p>
                    
                </div>
            </div>
            <div className="ExtraInfo">
              <div className="graphContainer">
                <div className="graphBox">
                  Information

                </div>
                <div className="graphBox">
                  Graph

                </div>
                <div className="graphBox">
                  Pie chart

                </div>
              </div>
            </div>
        </div>
     );
};
export default CompoundCalculator;