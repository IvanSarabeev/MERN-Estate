import express, { NextFunction, Request, Response } from 'express';
import { format, toZonedTime } from "date-fns-tz";
import { EUROPE_TIME_ZONE } from 'helpers/ResponseStatus';

const router = express();

const date = Date.now();
const timeZone = 'GMT';
const currentZonedDate = toZonedTime(date, EUROPE_TIME_ZONE);
const formattedDate = format(currentZonedDate, `EEEE, dd MM yyyy HH:mm:ss '${timeZone}'`, {
    timeZone: timeZone
})

router.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

router.get('/health', (req: Request, res: Response) => {   
    const healthCheck = {
        uptime: process.uptime(),
        message: 'OK',
        date: formattedDate
    };

    res.status(200).send(healthCheck);
});

export default router;