import React from "react";
import {Link} from 'react-router-dom';

//class Test extends React.Component {
function Navigationbar() {

  // this.state() = {margin: true};


  // function openNav() {
  //   // document.getElementById("mySidenav").style.width = 250;
  //   this.setState({margin: this.state.margin = 250})

  // }
  
  // function closeNav() {
  //   //document.getElementById("mySidenav").style.width = 0;
  // }
  
  return(
  // <div>

  //   <div id="mySidenav" className="sidenav">
  //     <a href="javascript:void(0)" className="closebtn" onclick="closeNav()">&times;</a>
  //     <a href="#">About</a>
  //     <a href="#">Services</a>
  //     <a href="#">Clients</a>
  //     <a href="#">Contact</a>
  //   </div>

  //   <h2>Animated Sidenav Example</h2>
  //   <p>Click on the element below to open the side navigation menu.</p>
  //   <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; open</span>

  // </div>

      //my original banner

        <div className="banner">
          {/* <img 
            //src="../img/TreeLogo2.png" alt="new" width="50" height="50"
            //src="../img/Bridgebackground.jpeg" alt="new"
            //src="../img/WebsiteBackgroundHome.jpeg" alt="new" width="50" height="50"
            src="../img/LinekedinCover.jpeg" alt="ggnew" width="50" height="50"
          /> */}

          <websitetitle>Money Time</websitetitle>
          <div className="navigation">
            <Link to="/">
              <button type ="button" className="dropbtn">Home</button>
            </Link>
            <div class="dropdown">
              <button class="dropbtn">Calculators</button>
              <div class="dropdown-content">
                <a href="/compound">Compound Interest</a>
                <a href="/mortgage">Mortgage</a>
              </div>
            </div>
            {/* <div class="dropdown">
              <button class="dropbtn">Articles</button>
              <div class="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            </div> */}
          </div>
          
        </div>
    );
};
export default Navigationbar;