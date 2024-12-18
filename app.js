// Get the  dependicies 

const express = require('express');
const mariadb = require('mariadb');
const nodemon = require('nodemon');

// Instantiate an express (web) app
const app = express();
// APP INSTANTALL HAS TO BE BEFORE ANYTHING RUNS i.e app.use

//to use the boxicons from node_modules
app.use('/js', express.static('actions.js'));
// access the public folder
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));




// Define a port number for 
const PORT = 3000;

app.use(express.static('public'));

// configure the connection 
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Black202',
    database: 'pearup'
});

// Connect to the database
async function connect() {
    try {
        let conn = await pool.getConnection();
        console.log('Connected to the database');
        return conn;
    } catch (err) {
        console.log('Error connecting to the database: ' + err);
    }
}

// Tell the app to encode data into JSON format
app.use(express.urlencoded({ extended: false }));

// Set your view (templating) engine to "EJS"
// (We use a templating engine to create dynamic web pages)
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // Log message to the server's console
    console.log("Hello, world - server!");
    res.render('home');
});

app.get('/form', (req, res) => {
    // Log message to the server's console
    console.log("Hello, world - server!");
    res.render('form');
});

app.get('/community', (req, res) => {
    // Log message to the server's console
    console.log("Hello, world - server!");
    res.render('community');
});

// Defining post routes

app.post('/community', async (req, res) => {
    console.log(req.body);
    const data = req.body;


    // building collection with ddb
    const conn = await connect();

    // making the insert statement
    await conn.query(`
        INSERT INTO jobapps (fname, lName, company, email, fields, link, message)
        VALUES ('${data.fname}', '${data.lname}', '${data.company}', '${data.email}'
        , '${data.fields}', '${data.link}', '${data.message}');
    `);

    const allApps = await conn.query('Select * FROM jobapps');

    console.log(allApps);
    res.render('community', {jobs : allApps}); 

    
});

app.post('/admin', async (req, res) => {
    const login = req.body;
    const conn = await connect();

    const [admin] = await conn.query('SELECT * FROM admins');
    const [appCount] = await conn.query('SELECT COUNT(*) as appCount FROM jobapps');
    const [uniqueJobs] = await conn.query('SELECT COUNT(DISTINCT company) as uniqueJobs FROM jobapps');

    console.log("User Input:", login.login, login.password);
    console.log(login);
    console.log("Database login:", admin.username, admin.password);
    console.log(admin);

    
    
    if (admin.username === login.login && admin.password === login.password) {
        res.render('admin', { 
            stats: {
                appCount: appCount.appCount,
                uniqueJobs: uniqueJobs.uniqueJobs
                
            }
        });
        return; // Ensure the function exits after rendering
    }

    res.status(401).send("The username or password is incorrect");
});




app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
