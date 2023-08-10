const express = require('express');
const router = express.Router();

// main Endpoint
router.get('/', (req, res) => {
    res.send("<h1>I'm online!</h1><p>PSITS Rest API</p>")
})

module.exports = router;