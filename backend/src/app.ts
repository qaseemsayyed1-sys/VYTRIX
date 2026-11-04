import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import financeRoutes from './routes/finance.routes';
import purchaseRoutes from './routes/purchase.routes';
import paypalRoutes from './routes/paypal.routes';
import sellerRoutes from './routes/seller.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://vytrix-app.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'VYTRIX AEGIS SENTINEL Backend',
    version: '1.0.0'
  });
});

app.use('/api/finance', financeRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/paypal', paypalRoutes);
app.use('/api/seller', sellerRoutes);

app.use(errorHandler);

export default app;