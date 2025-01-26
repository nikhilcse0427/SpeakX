
// import express from 'express';
// import cors from 'cors';  
// import mongoose from 'mongoose';
// import { JsonData } from './models/jsonData.model.js';

// const app = express();
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:5173'  
// }));


// app.get('/',(req,res)=>{
//   res.send("Welcome to the Server")
// })
// app.get('/api', async (req, res) => {
//   try {
//     const data = await JsonData.find();
//     res.json(data); 
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//        message: 'Internal Server Error'
//       });
//   }
// });

// export {app}


import express from 'express';
import cors from 'cors';  
import mongoose from 'mongoose';
import { JsonData } from './models/jsonData.model.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'  // Allow frontend requests from this origin
}));

// Root endpoint
app.get('/', (req, res) => {
  res.send("Welcome to the Server");
});

// API endpoint to get JSON data
app.get('/api', async (req, res) => {
  try {
    const data = await JsonData.find(); // Fetch data from MongoDB collection
    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.json(data); // Return the data
  } catch (error) {
    console.error(error);
    res.status(500).json({
       message: 'Internal Server Error',
       error: error.message
    });
  }
});

// Export the app
export { app };
