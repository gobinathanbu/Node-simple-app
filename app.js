// const express = require('express');
// const app = express();
// const mongoose = require('mongoose')

// mongoose.connect('mongodb+srv://gobi:O0pwaG0oK6GvX8uf@cluster0-dvjd2.mongodb.net/project0?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
//     console.log("database connected");
// }).catch(() => {
//     console.log('database connection failed');
// })

// app.get('/', (req, res) => {
//     res.send('This is home page');
// })

// app.listen(3500);
// console.log("server started");









const express = require('express');
const app = express();
require('dotenv').config();
var cors = require('cors');

const mongoose = require('mongoose');

// DB Connection
mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connected'))
    .catch((error) => console.log(error));

// Middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// Routes
const postsRoutes = require('./routes/posts');
app.use('/', postsRoutes);

// 404 Catcher
app.use((req, res, next) => {
    const error = new Error('URL Not Found');
    error.status = 404;
    next(error);
});

// Error Handling
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({ message: `Error! ${error.message}`, error: error });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));