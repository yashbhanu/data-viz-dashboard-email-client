import express from 'express'
import featureRouter from './routes/featureRouter';
const app = express()
const port = 4000

const allowedOrigins = [
  "http://localhost:3000"
];
const options = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());
app.use("api/feature", featureRouter)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})