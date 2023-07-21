require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;
const toDoItemRouter = require('./routers/to_do_items_router');
const userRouter = require('./routers/user_router');
const cron = require('node-cron');
const axios = require('axios');

// const userRouter = require('./routers/user_router');


app.use(express.urlencoded({ extended: true })); // to catch data
app.use(express.json());


app.use(methodOverride('_method'));

app.use(cors({
    origin: '*'
}));

// handle cors pre-flight requests
app.options('*', cors());

app.use('/api/toDoItems', toDoItemRouter);
app.use('/api/users', userRouter);

//cron functionality

const sendPostRequest = async () => {
    try {
        const response = await axios.patch('https://todolistbe.onrender.com/api/toDoItems/reset');
        console.log('POST request successful:', response.data);
    } catch (error) {
        console.error('Error sending POST request:', error.message);
    }
};

// Schedule the task to run every day at 7:30 AMnode
cron.schedule('*/1 * * * *', () => {
    console.log('Sending the scheduled POST request...');
    sendPostRequest();
});

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(() => {

        console.log('DB connected');

        // boot up app
        app.listen(port, () => {
            console.log('ToDoItemBE running on port: ', port);
        });

    })
    .catch(err => {
        console.log('err when connecting: ' + err);
    });