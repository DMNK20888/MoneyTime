
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
app.use(express.static(path.resolve(__dirname, '../client/public'))); //could be build
app.use('/static', express.static(path.join(__dirname, '../client/build')));



// Have Node serve the files for our built React app
//app.arguments(express.static(path.resolve(__dirname, '../client/build')));

//All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '.../client/build', 'index.html'));
});

