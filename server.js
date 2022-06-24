console.log('Lets make some quotes!')

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://Sam:u0bWaKQjqFw9fxT4@samdatabase.xgxn6xe.mongodb.net/?retryWrites=true&w=majority'



MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('anime-quotes')
    const quotesCollection = db.collection('quotes')

    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(express.static('public'))

    app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate(
            { name: 'Naruto'},
            {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote
                }
            },
            {
                upsert: true
            }
        )
        .then( results => {
            res.json('Success')
        })
        .catch(error => console.error(error))
      })

     //Reads the index file
    app.get('/', (req, res) => {
        quotesCollection.find().toArray()
            .then(results => {
                // console.log(results)
                res.render('index.ejs', {quotes: results})
            })
            .catch(error => console.error(error))
    })

    //Creates stored object in database
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })

    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
          { name: req.body.name }
        )
          .then(result => {
            if (result.deletedCount === 0) {
              return res.json('No quote to delete')
            }
            res.json('Deleted Sasuke\'s quote')
          })
          .catch(error => console.error(error))
      })

    app.listen(3000, () => {
    console.log('Listening on 3000')
    })


  })
  .catch(error => console.error(error))



