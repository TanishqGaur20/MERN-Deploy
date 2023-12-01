const express = require('express');
const router = express.Router();




router.post('/foodData', (req, res) => {

    try {
        res.send([global.food_data, global.foodcategory]);
    } catch (error) {
        console.log(error);
    }

});

module.exports = router;