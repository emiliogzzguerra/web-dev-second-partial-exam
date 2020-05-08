const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const {Sports} = require('./models/sport-model')
const { DATABASE_URL, PORT } = require( './config' );

const app = express();


/* Your code goes here */
app.get('/sports', (req, res) => {
    Sports.getAllSports().then(sports => {
        return res.status(200).send(sports);
    }).catch(err => {
        res.statusMessage = "An error occurred";
        return res.status(500).send();
    });
})

app.post('/sports/create', jsonParser,(req, res) => {
    Sports.createSport(req.body.name, req.body.num_players).then(createdSport => {
        return res.status(200).send(createdSport);
    }).catch(err => {
        res.statusMessage = "An error occurred";
        return res.status(500).send();
    });
})

app.get('/sports/delete', jsonParser, (req, res) => {
    if(!req.body.id) {
        res.statusMessage = "An id was not found on the body";
        return res.status(406).send();
    }

    if(!req.query.sportId) {
        res.statusMessage = "An id was not found on the querystring";
        return res.status(406).send();
    }

    if(req.query.sportId != req.body.id) {
        res.statusMessage = "The id provided on the querystring doesn't match the one on the body";
        return res.status(409).send();
    }

    Sports.deleteSport(req.body.id).then(deletionResponse => {
        if (deletionResponse.deletedCount == 0){
            deletionResponse.statusMessage = "We didn't find that ID";
            return res.status(404).send();
        } else {
            return res.status(204).send();   
        }
    }).catch(err => {
        res.statusMessage = "An error occurred on the db";
        return res.status(500).send();
    })
})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});