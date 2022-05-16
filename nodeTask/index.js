var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var PORT = process.env.PORT || 3000

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('./routes/uploadImgToS3')

const db = require('./models');
app.use(bodyParser.json())
app.use(cors())
app.use(  
  bodyParser.urlencoded({
    extended: false
  })
)

var Search = require('./routes/search');
var Post = require('./routes/Post');
var uploadToS3 = require('./routes/uploadImgToS3')

app.use('/search', Search);
app.use('/post', Post);
app.use('/uploadToS3', uploadToS3);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/images/:key', (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
});

app.post('/images', upload.single('image'), async (req, res) => {
  const file = req.file
  console.log(file)

  // apply filter
  // resize 

  const result = await uploadFile(file)
  await unlinkFile(file.path)
  console.log(result)
  const description = req.body.description
  res.send({imagePath: `/images/${result.Key}`})
})

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`listening on: http://localhost:${PORT}`);
    });
  });