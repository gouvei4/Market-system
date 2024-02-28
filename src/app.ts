import routes from './routes/routes';
import cors from 'cors';
import express from 'express';

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});