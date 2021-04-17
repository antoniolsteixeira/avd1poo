import { Router } from 'express';
import provasRouter from './provas.routes';

const routes = Router();

routes.use('/provas', provasRouter);

export default routes;
