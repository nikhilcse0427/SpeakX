import express from 'express';
import { jsonData } from './models/jsonData.model.js'; 
import mongoose from 'mongoose'
const app = express();

app.use(express.json({ limit: '16kb' }));


app.get('/', (req, res) => {
  res.send("hello world");
});


const getAllData = async (req, res) => {
  try {
    const data = await jsonData.findById(new mongoose.Types.ObjectId('6654e3e00cd382ca30a019e1'));
    res.json(data); 
    console.log(data)
  } catch (error) {
    console.log(error);
    res.send(error); 
  }
};

// Add a route to use the getAllData function
app.get('/data', getAllData);

// Export the app
export { app };

// Ensure you start the server in the main file (e.g., index.js or server.js)
// Example (in your entry file):
// import { app } from './app.js';
// app.listen(3000, () => console.log('Server is running on port 3000'));
