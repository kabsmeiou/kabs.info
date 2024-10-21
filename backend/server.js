import express from 'express'; // Use ES module syntax
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import path from 'path'; 

dotenv.config();

import projectsRoutes from "./routes/projects.js";

// express server
const app = express();
const port = process.env.PORT || 5000;

const __dirname = path.resolve();

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// middleware
app.use(cors());
app.use(express.json());

//route 
app.use('/projects', projectsRoutes);

// database / connect to uri from mongodb atlas
try {
  const uri = process.env.ATLAS_URI;
  mongoose.connect(uri);
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log(`MongoDB database connection: ok! at ${connection.host}`);
  });
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}



// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, "kabs.info/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "kabs.info", "dist", "index.html"));
//   })
// }

// start the server (listen to port)
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});