
const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
    console.log('Server listening on ${PORT}');
});

//Have NODE serve the files for our built React app
//app.use(express.static(path.resolve(__dirname, '../client/public'))); //could be build

//app.use(express.static(path.join(__dirname, "../client/public")));


//app.use('/static', express.static(path.join(__dirname, 'client/build')));
//app.use('/static', express.static(path.join(__dirname, 'client/public')));
app.use('/static', express.static(path.join(__dirname, '../client/public'))) //just added the ../


//two ideas
// TRY / infront , also TRY client/public
//TRY IT DOWN BELOW as well



//app.use('/static', express.static(path.join(__dirname, 'client/public')));
//app.use(express.static(path.join(__dirname, '../client/public')));
//app.use('/static', express.static(path.join(__dirname, '../client/public')));
//app.use(express.static(__dirname+"/client/public"));



// Have Node serve the files for our built React app
//app.arguments(express.static(path.resolve(__dirname, '../client/build')));

//All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    //res.sendFile(path.resolve(__dirname, '../client/build', 'index.html')); //changed this from ... to ..

    res.sendFile('../client/public/index.html', {root: path.dirname(__dirname)});

    //res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));


    //res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
    //res.sendFile(path.resolve(__dirname, 'client/public', 'index.html'));
    //res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
    //res.sendFile('../client/public/index.html', {root: __dirname});


    //res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    
    //res.sendFile('../client/build/index.html', {root: __dirname});
    
    //console.log(res.sendFile(path.resolve(__dirname, '../client/public', 'index.html')));
});


