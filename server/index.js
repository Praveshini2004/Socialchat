import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';
import ChatRoute from './Routes/ChatRoute.js';
import MessageRoute from './Routes/MessageRoute.js';

dotenv.config();

const app = express();

// Static file serving
app.use(express.static('public'));
app.use('/images', express.static('images'));

// Body parser configuration
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// CORS configuration
app.use(cors({
  origin: ["https://socialchat-frontend.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true
}));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);
app.use('/chat', ChatRoute);
app.use('/message', MessageRoute);

// Database connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(error => {
  console.error("Error connecting to MongoDB:", error.message);
});

export default app;
