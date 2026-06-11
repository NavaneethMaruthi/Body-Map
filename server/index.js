require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => res.send('BodyMap API running'));

app.post('/test', (req, res) => {
  res.json({ received: req.body });
});

app.use('/api/auth',     require('./routes/auth'));
app.use('/api/symptoms', require('./routes/symptoms'));
app.use('/api/insights', require('./routes/insights'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Something went wrong', error: err.message });
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);