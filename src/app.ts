import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'reflect-metadata';
require('dotenv').config();

import userRoutes from './routes/userRoutes';
import hotelRoutes from './routes/hotelRoutes';
import facilityGroupRoutes from './routes/facilityGroupRoutes';
import { errorMiddleWare } from './middlewares/errorMiddleware';

const app = express()

// middlewares
app.use(helmet())
app.use(cors<Request>())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/users', userRoutes);
app.use('/hotels', hotelRoutes);
app.use('/hotels', facilityGroupRoutes)

// root
app.get('/', async (_req: Request, res: Response) => {
    res.json({ message: 'welcome!' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


// error middleware
app.use(errorMiddleWare);