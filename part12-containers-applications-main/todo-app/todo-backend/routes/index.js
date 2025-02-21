const express = require('express');
const router = express.Router();
const redis = require('../redis')
const {getAsync, setAsync} = require('../redis/index')

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const counter = await getAsync("counter")
  res.json(JSON.parse(counter))
})
module.exports = router;
