const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://seandamon:Thando2008@localhost:5432/waiters';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});


let app = express();

app.use(session({
    secret: 'keyboard us3rs',
    resave: false,
    saveUninitialized: true
}));

app.engine('handlebars', exphbs(
    {
        defaultLayout: 'main'
    }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(flash());
app.use(session({
    secret: "bill",
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('home')
});

app.get('/waiters/:username', async function (req, res) {
    const waiter = req.params.username;
    let outcome = await pool.query('select * from waiters where username = $1', [waiter]);
    if (outcome.rows[0].length === 0) {
        await pool.query('insert into waiters (username) values ($1)', [waiter]);
    }

    res.render('days', { username: waiter
    });
});










let PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('App running on port', PORT);
});