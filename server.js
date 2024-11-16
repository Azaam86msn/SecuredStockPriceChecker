'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');

const helmet = require('helmet');

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' })); // For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enhance security with Helmet middleware
app.use(helmet());

// Content Security Policy setup
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"]
    }
  })
);

// Prevent browsers from trying to guess ("sniff") the MIME type
app.use(helmet.noSniff());

// Prevent the site from being displayed in a frame (protects against clickjacking)
app.use(helmet.frameguard({ action: 'deny' }));

// Prevent XSS (cross-site scripting) attacks by filtering out unsafe characters
app.use(helmet.xssFilter());

// Hides the X-Powered-By header to reduce the risk of attacks targeting specific technologies
app.use(helmet.hidePoweredBy());

// Enforces HTTPS on supported browsers
app.use(helmet.hsts({
  maxAge: 63072000, // 2 years in seconds
  includeSubDomains: true, // Apply to all subdomains
  preload: true
}));

// Helps prevent clickjacking attacks by ensuring the site is not displayed in a frame
app.use(helmet.frameguard({ action: 'sameorigin' }));

// Controls cross-domain policies
app.use(helmet.permittedCrossDomainPolicies());

// Additional Helmet features to help prevent common vulnerabilities
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

// For FCC testing purposes
fccTestingRoutes(app);

// Routing for API 
apiRoutes(app);  
    
// 404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

// Start our server and tests!
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 3500);
  }
});

module.exports = app; // for testing
