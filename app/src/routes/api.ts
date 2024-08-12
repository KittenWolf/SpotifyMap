import { Router, Request, Response } from 'express';
import HttpStatusCodes from '@src/configurations/HttpStatusCodes';
import path from 'path';
import { parseScv } from '@src/declarations/functions';

const apiRouter = Router();

parseScv();

apiRouter.get('/data', (req: Request, res: Response) => {  
  res.header("Content-Type",'application/json');
  res.status(HttpStatusCodes.OK)
    .sendFile(path.join(__dirname, '../data/json/Most Streamed Spotify Songs 2024.json'));
});

export default apiRouter;
