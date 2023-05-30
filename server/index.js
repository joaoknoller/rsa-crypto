import express from 'express';
import multer from 'multer';

const app = express();
const port = 3000;
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/criptografar', upload.single('arquivo'), (req, res) => {
    console.log(req.body);
    console.log(req.files);
    res.send('Hello World!');
});

app.post('/descriptografar', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Escutando a porta ${port}`);
});