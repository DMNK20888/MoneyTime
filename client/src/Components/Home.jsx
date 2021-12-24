import React from 'react';

function Home () {
    return (
        // <div id="background">
        //     <p>hello1</p>
        //     <div className="inputBox" id="homeBox">
        //         Hello
        //     </div>

        // </div>

        <div id="compoundBox" className="homeimage">
            <div className="inputBox" id = "homebox">
                <div id="content">
                    <div id="additionTitle">
                        <h2 id="homeTitle">Home</h2>
                    </div>

                    <div className="inputContainer" id="homeInputContainer">
                        {/* <div className="myInput">
                            <label id="inputLabel">Starting Amount:</label>
                            <div class="input-group-append">
                            <span className = "inputSpan">$</span>
                            <input type="text" id="amount" className="textInput" placeholder="Enter Amount"/>
                            </div>
                        </div>

                        <div className="myInput">
                            <label>Time to Grow: </label>
                            <input type="text" id="years" className="textInput" placeholder="Enter Years"/>
                        </div> */}
                        <p>Choose between our two financial calculators.</p>
                        <div id="HomeButtonContainers">
                            {/* <p>Choose between our two financial calculators.</p> */}
                            <a href="/compound" className="signup">Investment</a>
                            <a href="/mortgage" className="signup">Mortgage</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>





        // <div id="compoundBox" className="homeImage">
        //     <h2>Home</h2>
        //     <div className="inputBox" id="homeBox"></div>
            
        //      {/* <div className="inputBox" id="homeBox">
        //          <h2>Home</h2>
        //          <label>Your home for saving, investing and tracking your wealth
        //              <br/>We have every calculator and tool for all of your money needs</label>
                  
        //      </div>
        //      <div id="HomeButtonContainers">
        //          <a href="something" class="signup">Sign Up</a>
        //      </div> */}
        // </div>
        



    )
}

export default Home;