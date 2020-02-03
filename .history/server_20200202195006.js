const express = require('express');
const db = require('./models');
const routes = require('./routes');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/', routes);
app.use(compression());
// Sync sequelize models then start Express app
// =============================================
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on PORT ${PORT}`);
    });
});