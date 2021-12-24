import React, { useRef, useEffect, useState } from "react";
import MyD3Component from "./D3Component";
import Barchart from "./Barchart"

let pieChartData = [
  { name: 'No Data Yet', value: 100, color:'#0676c1'},
  { name: 'Principal', value: 0, color:'#0659a6'},
  { name: 'Interest', value: 0, color:'#0676c1'},
  { name: 'Taxes', value: 0, color: '#FF0000'}
];

function MortgageCalculator() {     

  const [pieData, setPieData] = useState(pieChartData);
  //const [barData, setBarData] = useState(barChartData);
  //const [barGroup, setBarGroup] = useState(barChartGroup)

    function calculate() {
      //get user input and put them in variables
      let price = document.getElementById("price");
      let downpayment = document.getElementById("downpayment");
      let years = document.getElementById("years");
      let interest = document.getElementById("rate");
      var result = document.getElementById('result');
      var taxes = document.getElementById('tax')

      //check if all inputs are valid numbers
      if((isNaN(price.value) || !price.value) || (isNaN(downpayment.value) || !downpayment.value) || (isNaN(years.value) || !years.value) || (isNaN(interest.value) || !interest.value) || (isNaN(taxes.value) || !taxes.value)){
        //make alert
        alert("Please input valid numbers into the input boxes.");
        return;
      }




      var p = price.value - downpayment.value; //principal loan amount
      var m = years.value*12; //length of the loan in months
      var i = (interest.value*0.01)/12; //interest rate

      var answer = p*(i/(1-Math.pow((i+1),-m))) + Number(taxes.value);
      let mortgagePayment = answer;

      //var answer = p*(i*Math.pow((1+i),m)/(Math.pow((1+i),m-1)));
      console.log("answer", answer);
      answer = answer.toFixed(2); //shorten to two decimal places
      answer = addCommas(answer); //add commas at every thousands place

      result.innerHTML = ' $'+answer; 

      //calculate interest principal and interest
      var interestPaid = mortgagePayment*m - (price.value - downpayment.value);

      //calculate the the principal, interest, and taxes per month
      var myPrincipal = ((price.value-downpayment.value)/(mortgagePayment*m))*100;
      var myTaxes = (taxes.value/(mortgagePayment))*100;
      var myInterest = ((interestPaid)/(mortgagePayment*m))*100

      //Updat the data for the piechart with new values
      pieChartData = [
        { name: 'Principal', value: myPrincipal, number:(myPrincipal/m), color:'#003f5c'},
        { name: 'Interest', value: myInterest, number:(interestPaid/m), color:'#ffa600'},
        { name: 'Taxes', value: myTaxes, number: taxes.value, color: '#bc5090'}
      ];

      setPieData(pieChartData);
      //let numPrincipal = myPrincipal/m;
      //let numInterest = interestPaid/m;
      //let numTax = taxes.value;

    }
  
    function addCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return(

        <div id="compoundBox">
            <div className="inputBox">
                <h2 id="componentTitle">Mortgage Calculator</h2>

                <div className="inputContainer">



                    {/* <div className="myInput">
                        <label>Home Price: </label>
                        <div class="input-group-append">
                          <span className = "inputSpan">$</span>
                          <input type="text" id="price" className="textInput" placeholder="Enter Price"></input>
                        </div>
                    </div> */}

                    <div className="myInput">
                      <label id="inputLabel">Home Price:</label>
                      <div class="input-group-append">
                        <span className = "inputSpan">$</span>
                        <input type="text" id="price" className="textInput" placeholder="Enter Price"/>
                      </div>
                    </div>







                    <div  className="myInput">
                      <label>Downpayment: </label>
                      <div class="input-group-append">
                        <span className = "inputSpan">$</span>
                        <input type="text" id="downpayment" className="textInput" placeholder="Enter Downpayment"/>
                      </div>
                    </div>

                    <div className="myInput">
                      <label>Length of Loan: </label>
                      <input type="text" id="years" className="textInput" placeholder="Enter Years"/>
                    </div>

                    <div className="myInput">
                      <label>Interest Rate: </label>
                      <div class="input-group-append">
                          <input type="text" id="rate" className="textInput" placeholder="Enter Rate"/>
                          <span className = "inputSpan" id="test">%</span>
                        </div>
                    </div>
                    <div className="myInput">
                        <label>Taxes/Month: </label>
                        <div class="input-group-append">
                          <span className = "inputSpan">$</span>
                          <input type="text" id="tax" className="textInput" placeholder="Enter Amount"/>
                        </div>
                    </div>
                    <button id="submit" onClick={calculate}>{'Submit >>'}</button>
                </div>
                <div className="resultBox">
                  <p>Your monthly mortage payment is: </p><p id="result"> </p>
                    
                </div>
            </div>
            <div className="ExtraInfo">
              <div className="graphContainer">
                <div className="graphBox" id="infoBox">
                  <p id="infoHeader">Information</p>
                  <p>You can use the above calculator to find your monthly mortgage rate for a home.</p>
                  <p>Over an extended period of time funds with additions can grow exponentially through compound interest.</p>
                  <p>The average return of the US stock marget over the last 100 years is around 7-10% per year</p>

                </div>
                {/*<div className="graphBox">
                  <p id="infoHeader">Graph</p>
                </div> */}
                <div className="graphBox" id="pieBox">
                  <p id="infoHeader">Pie Chart</p>
                  <div id='map'>
                    <MyD3Component id="piechart" name ={"pie2"} data = {pieData}/> 
                    {/* <Barchart name ={"bar1"} data = {barData}/> */}
                    <div id="circle">
                      <div className="dot1"/> 
                      <p className="circleText" >Principal</p><p id="result"> </p>
                    </div>
                    <div id="circle">
                      <div className="dot2"/> 
                      <p className="circleText" >Interest</p><p id="result"> </p>
                    </div>
                    <div id="circle">
                      <div className="dot3"/> 
                      <p className="circleText" >Taxes</p><p id="result"> </p>
                    </div>
                    
                  </div>

                </div>
              </div>
            </div>
        </div>
    );
};
export default MortgageCalculator;