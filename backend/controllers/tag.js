const db = require('../database/db.js');
const logger = require("../utils/logger");
const router = require('express').Router();

router.post('/emulate/ping/:id', async (request, response, next) => {
    try {
        const { id } = request.params;

        const { lat, long } = request.body;

        if (!lat || !long) {
            return response.status(400).send({ error: "Latitude and longitude are required" });
        }

        db.data.tags[id] = {
            lat: lat,
            long: long,
            when: new Date()
        }

        db.write();

        response.send();
    } catch(error) {
        logger.debug(error)
        response.status(500).send(error.message);
    }
})

module.exports = router;