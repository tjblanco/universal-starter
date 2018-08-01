import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import {join} from 'path';
import * as twilio from 'twilio';
const randomName = require('./src/assets/randomname');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('/', (req, res) => {
    res.render('index', { req });
});

app.get('/token', function(request, response) {
    // Twilio server
    const AccessToken = twilio.jwt.AccessToken;
    const VideoGrant = AccessToken.VideoGrant;
    const identity = randomName();
    // Create an access token which we will sign and return to the client,
    // containing the grant we just created.
    const token = new AccessToken(
        'ACb502cdc5b1b17492802aed880cad0b22',
        'SK0b750704beec9dba28891e9f75d0355f',
        '3Cox8tqJSYghRSl2hLrNGpcIW3L4aMH6'
    );

    // Assign the generated identity to the token.
    token.identity = identity;

    // Grant the access token Twilio Video capabilities.
    const grant = new VideoGrant();
    token.addGrant(grant);
    // Serialize the token to a JWT string and include it in a JSON response.
    response.send({
        identity: identity,
        token: token.toJwt()
    });
});
app.get('/*', (req, res) => {
    res.render('index', { req });
});
// Start up the Node server
app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});
