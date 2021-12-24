import React from "react";
import './App.css';
//import './index.css';
import Navigationbar from './Navigation/Navigation.jsx';
import Footer from './Navigation/Footer.jsx';
//import CompoundCalculator from "./Components/CompoundCalculator.jsx";
import CompoundAdditions from "./Components/CompoundAdditions.jsx";
import MortgageCalculator from "./Components/Mortgage.jsx";
import Home from "./Components/Home.jsx";
//import Barchart from "./Components/Barchart";
//import MyD3Component from "./Components/D3Component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  //const[data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json());
      //.then((data) => setData(data.message));
  }, []);

//************************************************************************************** */
  return (
    <body>
      <Router>
      <header>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <script src="https://d3js.org/d3.v4.min.js"></script>
        <Navigationbar/>
      </header> 
      <main
        style={{
        backgroundImage: `linear-gradient( #B1D4E0, #2E8BC0 )`,
        //backgroundImage: 'img/WebsiteBackground',
        //backgroundImage: `url("img/WebsiteBackgroundHome.jpeg")`, 
        backgroundSize: "cover",
        // paddingTop: "85px",
      }}>
        
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/compound" exact component={() => <CompoundAdditions />} />
          <Route path="/mortgage" exact component={() => <MortgageCalculator />} />
        </Switch>
      </main>
      <Footer/>
      </Router>
    </body>
    
  );
};

export default App;
