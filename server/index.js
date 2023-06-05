import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import { cifrar, decifrar } from "./rsa/rsa.js";
import "dotenv/config.js";

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function (request, file, callback) {
    const extensaoArquivo = file.originalname.split(".")[1];

    const novoNomeArquivo =
      Math.floor(Math.random() * (999909 - 100000 + 1)) + 100000;

    callback(null, `${novoNomeArquivo}.${extensaoArquivo}`);
  },
});
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:1234",
  })
);

app.post("/criptografar", upload.single("arquivo"), (req, res) => {
  try {
    const path = req.file.path;
    const { tamanhoAlfabeto, valorDoN } = req.body;
    const reader = fs.createReadStream(path, "utf8");

    reader.on("data", async (chunk) => {
      const data = chunk.toString();
      const cifrado = await cifrar(
        data,
        +valorDoN || +process.env.N,
        tamanhoAlfabeto
      );
      res.status(200).send(cifrado);
    });
    reader.on("close", () => {
      fs.unlinkSync(`./${path}`);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
});

app.post("/descriptografar", upload.single("arquivo"), (req, res) => {
  try {
    const path = req.file.path;
    const { tamanhoAlfabeto, valorDoN } = req.body;
    const reader = fs.createReadStream(path, "utf8");

    reader.on("data", async (chunk) => {
      const string = chunk.toString();
      const data = Array.from(
        string.replace(/\[|\]/g, "").split(","),
        (x) => +x
      );
      const decifrado = await decifrar(
        data,
        +valorDoN || +process.env.N,
        tamanhoAlfabeto
      );
      res.status(200).send(decifrado);
    });

    reader.on("close", () => {
      fs.unlinkSync(`./${path}`);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
});

app.listen(port, () => {
  console.log(`Escutando a porta ${port}`);
});
