const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

/* Your code goes here */
const sportsSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String
    },
    num_players: {
        type: Number
    }
})

const sportsCollection = mongoose.model('sports', sportsSchema);

const Sports = {
    getAllSports: function () {
        return sportsCollection.find().then(res => {
            return res;
        }).catch(err => {
            return err;
        })
    },
    createSport: function (name, num_players) {
        return sportsCollection.create({id: uuid.v4(), name: name, num_players: num_players}).then(res => {
            return res;
        }).catch(err => {
            return err;
        })
    },
    deleteSport: function (id) {
        console.log("trying to delete one!")
        return sportsCollection.deleteOne({id: id}).then(res => {
            return res;
        }).catch(err => {
            console.log(err);
            return err;
        })
    }
}


module.exports = {
    Sports
};