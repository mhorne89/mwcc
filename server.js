'use strict';

const app = require('express')();
const images = require('./src/images.json');
const ExpressCache = require('express-cache-middleware');
const cacheManager = require('cache-manager');

const cacheMiddleware = new ExpressCache(
    cacheManager.caching({ store: 'memory', max: 10000, ttl: 3600 })
);

cacheMiddleware.attach(app);

app.get('/images', ({ query }, res) => {
    const i = (query.limit) ? images.slice(0, parseInt(query.limit)) : images;

    const response = i.map(obj => {
        const { id, alt_description, url, user } = obj;
        return { id, alt_description, url, user: { name: user.name, profile_image: user.profile_image } };
    });

    res.status(200).json(response);
});

app.listen(5000, () => {
    process.stdout.write('Server is available on http://localhost:5000/\n');
});
