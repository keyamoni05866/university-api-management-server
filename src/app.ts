import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();

//parser

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

//application routes

app.use('/api/v1', router);

app.use(globalErrorHandler);
app.use(notFound);

const test = async (req: Request, res: Response) => {
  // Promise.reject();
};

app.get('/', test);

export default app;
