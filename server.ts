// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';
const DIST_FOLDER = join(process.cwd(), 'dist');
import * as express from 'express';
import { join } from 'path';
const domino = require('domino');
const fs = require('fs');
const path = require('path');
const template = fs.readFileSync(path.join(DIST_FOLDER, 'browser', 'index.html')).toString();
const win = domino.createWindow(template);

global['window'] = win;
Object.defineProperty(win.document.body.style, 'transform', {
    value: () => {
        return {
            enumerable: true,
            configurable: true,
        };
    },
});
global['document'] = win.document;
global['CSS'] = null;
// global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
global['Prism'] = null;
// Faster server renders w/ Prod mode (dev mode never needed)
// enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;


// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// TODO: implement data requests securely
// app.get('/api/*', (req, res) => {
//     res.status(404).send('data requests are not supported');
// });

app.get('/api/data', (req, res) => {
    res.send({
        homestay: [
            {
                id: '1',
                name: 'homestay 1',
                address: '1tr Pham Van Bach street, HN'
            }, {
                id: '2',
                name: 'homestay 2',
                address: '2tr Pham Van Bach street, HN'
            }, {
                id: '3',
                name: 'homestay 4',
                address: '3tr Pham Van Bach street, HN'
            }, {
                id: '5',
                name: 'homestay 5',
                address: '5tr Pham Van Bach street, HN'
            }, {
                id: '6',
                name: 'homestay 6',
                address: '6tr Pham Van Bach street, HN'
            }, {
                id: '1',
                name: 'homestay 1',
                address: '1str Pham Van Bach street, HN'
            }, {
                id: '2',
                name: 'homestay 1',
                address: '1str Pham Van Bach street, HN'
            }
        ]
    })
})

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
    res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
    console.log(`Node server listening on http://localhost:${PORT}`);
});
