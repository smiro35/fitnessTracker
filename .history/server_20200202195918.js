const express = require('express');
const morgan = require('morgan');
// const routes = require('../routes');
const db = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbExample", { useNewUrlParser: true });

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// app.use('/', routes);

// Sync sequelize models then start Express app
// =============================================
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on PORT ${PORT}`);
    });
});