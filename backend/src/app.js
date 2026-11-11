import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import { AppError } from './utils/AppError.js';

const app = express();

// Atrás do proxy do host (Render/Vercel): necessário para o IP real no rate limit.
if (env.isProduction) app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      // Permite requisições sem Origin (curl, health checks) e origens autorizadas.
      if (!origin || env.corsOrigins.includes(origin)) return callback(null, true);
      return callback(new AppError('Origem não autorizada pelo CORS.', 403));
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'X-CSRF-Token'],
  }),
);
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

export default app;
