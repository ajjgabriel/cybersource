/**
 * Created by gaang on 18/4/18.
 */
require('dotenv').config({silent: true});
const app = require('./config/express');
//===== generator hook =====//


if (!module.parent) {
    let port = process.env.PORT || 3000;
    let env = process.env.NODE_ENV || 'development';
    app.listen(port, () => {
        console.log(`server started on port ${port} (${env})`);
});
}

module.exports = app;
