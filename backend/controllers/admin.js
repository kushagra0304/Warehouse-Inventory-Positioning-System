const db = require('../database/db.js');
const logger = require("../utils/logger");
const router = require('express').Router();

router.get('/getRelativePositionOfTagsFound', async (request, response, next) => {
    try {
        const { tags, scanner } = db.data;
        if (!tags || !scanner || !scanner.lat || !scanner.long) {
            return response.status(400).json({ error: "Invalid input data" });
        }

        const AREA_SIZE = 100; // 100m x 100m
        const EARTH_RADIUS = 6371000; // Earth radius in meters

        const toMeters = (lat1, lon1, lat2, lon2) => {
            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                      Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return EARTH_RADIUS * c;
        };

        let relativePositions = [];
        
        for (const [tagId, tagData] of Object.entries(tags)) {
            if (tagData.found) {
                const dx = toMeters(scanner.lat, scanner.long, scanner.lat, tagData.long);
                const dy = toMeters(scanner.lat, scanner.long, tagData.lat, scanner.long);
                
                const xPercent = (dx / AREA_SIZE) * 100;
                const yPercent = (dy / AREA_SIZE) * 100;

                relativePositions.push({ tagId, xPercent, yPercent });
            }
        }
        
        response.json({ relativePositions });
    } catch (error) {
        logger.debug(error);
        response.status(500).send(error.message);
    }
});

module.exports = router;