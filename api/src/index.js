require('dotenv').config();
const express = require('express');
const db = require('./models');

const app = express();

require('./utils/root')(app);

const PORT = process.env.PORT || 3001;

// connect the database
db.sequelize.sync();

// Run the server on ${PORT}
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
