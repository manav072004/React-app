import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import path from 'path';



dotenv.config()
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/', express.static("./client/build"))

const CONNECTION_URL = 'mongodb+srv://javascriptmaster:javascriptmaster123@cluster0.abb916h.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
 .catch((error) => console.log(`${error} did not connect`));

 mongoose.set('useFindAndModify', false);

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "/client/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(_dirname, "/client/build/index.html"))
);