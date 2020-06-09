import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { init as initDB } from './util/db';

dotenv.config();
initDB();

const port = process.env.PORT;
const app = express();

// Log all routes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method}: ${req.url}`);
  next();
});

app.use(cors());
app.use(routes);

app.use('*', (req, res) => {
  res.status(418).json({
    error: 'that route dont exist'
  });
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
