const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/courses', courseRoutes);

app.get('/', (req, res) => {
  res.send('CourseFlow Backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
