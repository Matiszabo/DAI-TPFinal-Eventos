import config from './src/configs/db-configs.js'
import pkg from 'pg' 
import cors from 'cors'
import express from 'express';

const { Client }  = pkg;
const app = express();
const port = 3000;

const client = new Client(config); 
await client.connect();

app.use(cors());
app.use(express.json());
//app.use('/front', express.static('public'));
//app.use('/api/event', EventRouter);
app.use('/api/provinces', ProvinceRouter);
app.use('/api/event-category', CategoriesRouter);
//app.use('/api/user', UserRouter);
//app.use(unknownEndpoint);
app.listen(port, () => {
console.log(`"server" Listening on port ${port}`);
})

//app.use('/api/user', UserRouter);
//app.use(unknownEndpoint);



