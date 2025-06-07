import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db';
import ingressoRoutes from './routes/ingressoRoutes';

const app = express();
const PORT = parseInt(process.env.PORT || '3001');

connectDB();

app.use(cors());
app.use(express.json());

app.use('/ingressos', ingressoRoutes);

app.get('/', (req, res) => {
  res.send('API do Microserviço de Ingressos está no ar!');
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor de Ingressos rodando na porta ${PORT}`);
});