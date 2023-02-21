const express = require('express')
const axios = require('axios')
const { reset } = require('nodemon')
const path = require('path')
const app = express()

const yelp_API = 'YOUR_API_KEY'
const GOOGLE_API = 'YOUR_API_KEY'
const PORT = process.env.PORT || 8080

var cors = require('cors')
app.use(cors())

app.get('/results', (req, res) => {
  var [lat, long] = req.query.location.split(",");
  const config = {
      headers: {
        Authorization:
          `Bearer ${yelp_API}`,
      },
      params: {
          term: req.query.term,
          latitude: lat,
          longitude: long,
          radius: parseInt(req.query.distance)*1609,
          categories: req.query.category,
          limit: 10
      },
    };
    axios.get("https://api.yelp.com/v3/businesses/search", config)
    .then((response) => {
      res.json(response.data);
    });

})

app.get('/details', (req, res) => {
  const config = {
      headers: {
        Authorization:
          `Bearer ${yelp_API}`,
      },
    };
    axios.get(`https://api.yelp.com/v3/businesses/${req.query.id}`, config)
    .then((response) => {
      res.json(response.data);
    });

})

app.get('/reviews', (req, res) => {
  const config = {
      headers: {
        Authorization:
          `Bearer ${yelp_API}`,
      },
    };
    axios.get(`https://api.yelp.com/v3/businesses/${req.query.id}/reviews`, config)
    .then((response) => {
      res.json(response.data);
    });

})

app.get('/auto', (req, res) => {
    const config = {
        headers: {
          Authorization:
            `Bearer ${yelp_API}`,
        },
        params: {
            text: req.query.text,
        },
      };
      axios
      .get("https://api.yelp.com/v3/autocomplete", config)
      .then((response) => {
        res.json(response.data); 
      });
}, [])

app.get('/geocode', (req, res) => {
  const config = {
      params: {
          address: req.query.location,
          key: GOOGLE_API
      },
    };
    axios
    .get(`https://maps.googleapis.com/maps/api/geocode/json`, config)
    .then((response) => {
      res.json(response.data); 
    });
}, [])

app.listen(PORT, () => { console.log("Hello") })