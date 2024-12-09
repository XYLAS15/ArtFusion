import express from 'express';
import  cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import useRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.port || 4000;

const app = express();

app.use(express.json());
app.use(cors());
await connectDB();

app.use('/api/user', useRouter)
app.use('/api/image', imageRouter)


app.get('/', (req, res)=> res.send('Api Working request'));

app.listen(PORT, ()=> console.log('server listening on port ' + PORT));