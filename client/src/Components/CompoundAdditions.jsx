import React, { useRef, useEffect, useState } from 'react';
import MyD3Component from "./D3Component";
import Barchart from "./Barchart"

let pieChartData = [
  { name: 'No Data Yet', value: 100, color:'#0676c1'},
  { name: 'Principal', value: 0, color:'#0659a6'},
  { name: 'Additions', value: 0, color: '#FF0000'},
  { name: 'Interest', value: 0, color:'#0676c1'},
];

let barChartData = [ { year: "0", amount: 0} ];

let barChartGroup = [];

function CompoundAdditions() {   
    
    const [pieData, setPieData] = useState(pieChartData);
    const [barData, setBarData] = useState(barChartData);
    const [barGroup, setBarGroup] = useState(barChartGroup)

    //calcultes investment growth on click
    function calculate() {

      //get user inputs into variables
      let amount = document.getElementById("amount");
      let percent = document.getElementById("return");
      let addition = document.getElementById("addition");
      let years = document.getElementById("years");
      var result = document.getElementById('answer');
      
      //check for completed inputs
      
      if((isNaN(amount.value) || !amount.value) || (isNaN(percent.value) || !percent.value) || (isNaN(addition.value) || !addition.value) || (isNaN(years.value) || !years.value)){
        //make alert
        alert("Please input valid numbers into the input boxes.");
        return;
      }
     
  


      //calculate the answer using compound interest principals
      let answer  = amount.value;
      for(let i = 1; i <= years.value; i++) {
        answer = answer * ((percent.value*0.01)+1.00);
        answer += Number(addition.value);
      }

      //determines how much of total answer is interest and how much is principal 
      var interest = answer - (Number(amount.value)+((Number(years.value)-1)*Number(addition.value)));
      var principal = answer - Number(interest) - ((Number(years.value)-1)*Number(addition.value));
      var additions = ((Number(years.value)-1)*Number(addition.value));

      interest = (interest/answer)*100; 
      principal = (principal/answer)*100;
      additions = (additions/answer)*100;

      answer = answer.toFixed(2); //shorten to two decimal places
      answer = addCommas(answer); //add commas at every thousands place
      result.innerHTML = ' $'+answer; 
      
      //updates the piechart's data
      pieChartData = [
        { name: 'Principal', value: principal, color:'#003f5c'},
        { name: 'Interest', value: interest, color:'#bc5090'},
        { name: 'Additions', value: additions, color:'#ffa600'},
      ]

      setPieData(pieChartData); //updates the data for the piechart
      
      //initialize variables and  push initial data to the barchart
      barChartData = [ ];
      barChartGroup = [ ];
      var yearTotal = Number(amount.value);
      var barList = [ amount.value, 0, 0 ];
      var barDictionary = { year: 0, amount: amount.value };
      barChartData.push(barDictionary);
      barChartGroup.push(barList);

      //calculates the barchart data and adds it to the list
      for(let i = 1; i <= years.value; i++) {
        var added = addition.value * (i);
        yearTotal = yearTotal * ((percent.value*0.01)+1.00);
        yearTotal += Number(addition.value);
        
        var myinterest = yearTotal - added - amount.value;
        barList = [ yearTotal, myinterest, added ];
        barDictionary = { year: i.toString(), amount: yearTotal };
        barChartGroup.push(barList);
        barChartData.push(barDictionary);
      }

      setBarGroup(barChartGroup); 
      setBarData(barChartData); //updates the data for the barchart
      //window.location.reload(false);
    }
  
    function addCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return(

        <div id="compoundBox">
            <div className="inputBox">
              <div id="additionTitle">
                <h2 id="componentTitle">Compound Interest Calculator</h2>
              </div>

                <div className="inputContainer">
                  <div className="myInput">
                    <label id="inputLabel">Starting Amount:</label>
                    <div class="input-group-append">
                      <span className = "inputSpan">$</span>
                      <input type="text" id="amount" className="textInput" placeholder="Enter Amount"/>
                    </div>
                  </div>

                  <div className="myInput">
                    <label>Return: </label>
                    <div class="input-group-append">
                      <input type="text" id="return" className="textInput" placeholder="Enter Return"/>
                      <span className = "inputSpan" id = "test">%</span>
                    </div>
                  </div>

                  <div className="myInput">
                    <label>Yearly Additions: </label>
                    <div class="input-group-append">
                      <span className = "inputSpan">$</span>
                      <input type="text" id="addition" className="textInput" placeholder="Enter Additions"/>
                    </div>
                  </div>

                  <div className="myInput">
                    <label>Time to Grow: </label>
                    <input type="text" id="years" className="textInput" placeholder="Enter Years"/>
                  </div>
                  <button id="submit" onClick={calculate}>{'Submit >>'}</button>
                </div>

                <div className="resultBox">
                  <p id="answerText">This investment will be worth: </p><p id="answer"> </p>   
                </div>
            </div>
            <div className="ExtraInfo">
              <div className="graphContainer">
                <div className="graphBox" id="infoBox">
                <p id="infoHeader">Information</p>
                  <p>You can use the above calculator to find investment returns overtime.</p>
                  <p>Over an extended period of time, funds with additions can grow exponentially through compound interest.</p>
                  <p>The average return of the US stock marget over the last 100 years is around 7-10% per year</p>
                  {/* <Barchart name ={"bar1"} data = {barData}/>  */}
                  {/* <MyD3Component id="piechart" name ={"pie2"} data = {pieData}/> */}
                </div>
                <div className="graphBox" id="barBox">
                <p id="infoHeader">Growth of Investment Over Time</p>
                  <div id='map'>
                    <Barchart name ={"bar1"} data = {barData} groups = {barGroup}/> 
                    {/* <MyD3Component id="piechart" name ={"pie2"} data = {pieData}/>  */}
                    {/* <div id="circle">
                      <div className="dot1"/> 
                      <p className="circleText" >Principal</p>
                    </div>
                    <div id="circle">
                      <div className="dot2"/> 
                      <p className="circleText" >Interest</p>
                    </div>
                    <div id="circle">
                      <div className="dot3"/> 
                      <p className="circleText" >Additions</p>
                    </div> */}
                  </div>
                    
                  </div>
                <div className="graphBox" id="pieBox">
                  <p id="infoHeader">Pie Chart</p>
                  <div id='map'>
                    <MyD3Component id="piechart" name ={"pie2"} data = {pieData}/> 
                    <div id="circle">
                      <div className="dot1"/> 
                      <p className="circleText" >Principal</p>
                    </div>
                    <div id="circle">
                      <div className="dot2"/> 
                      <p className="circleText" >Additions</p>
                    </div>
                    <div id="circle">
                      <div className="dot3"/> 
                      <p className="circleText" >Interest</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
};

export default CompoundAdditions;