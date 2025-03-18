const db = require('../database/db.js');
const logger = require("../utils/logger");
const router = require('express').Router();

router.post('/startScanner', async (request, response, next) => {
    try {
        const { lat, long } = request.body;

        db.data.scanner = {
            lat: lat,
            long: long,
            lastStart: new Date()
        }

        db.write()

        response.send();
    } catch(error) {
        logger.debug(error)
        response.status(500).send(error.message);
    }
})

router.post('/emulate/getTags', async (request, response, next) => {
    try {
        const { lat, long } = request.body;

        if (!lat || !long) {
            return response.status(400).send({ error: "Latitude and longitude are required" });
        }

        const tags = Object.entries(db.data.tags);

        // Function to calculate distance using Haversine formula
        const getDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371e3; // Earth's radius in meters
            const toRad = (angle) => (angle * Math.PI) / 180;

            const φ1 = toRad(lat1);
            const φ2 = toRad(lat2);
            const Δφ = toRad(lat2 - lat1);
            const Δλ = toRad(lon2 - lon1);

            const a = Math.sin(Δφ / 2) ** 2 +
                      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            return R * c; // Distance in meters
        };

        // Filter tags within 10m radius
        const nearbyTags = tags.filter(([id, tag]) => {
            const distance = getDistance(lat, long, tag.lat, tag.long);
            return distance <= 10; // 10 meters radius
        }).map(([id, tag]) => ({ id, ...tag }));

        response.send(nearbyTags);
    } catch (error) {
        console.error(error);
        response.status(500).send(error.message);
    }
});

router.post('/tagsFound', async (request, response, next) => {
    try {
        const tags = request.body; // Array of tag IDs

        if (!tags || !Array.isArray(tags)) {
            return response.status(400).send({ error: "Tags must be an array" });
        }

        // Update found status in the database
        tags.forEach(tagId => {
            if (db.data.tags[tagId]) {
                db.data.tags[tagId].found = true;
            }
        });

        db.write()

        response.send({ success: true, updatedTags: tags });
    } catch (error) {
        console.error(error);
        response.status(500).send(error.message);
    }
});

module.exports = router;