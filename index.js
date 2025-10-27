const express = require('express');
const app = express();
const port = 3000;
const db = require('./models');
const komik = require('./models/komik');
app.use(express.json());
app.use(
    express.urlencoded({ 
    extended:false,
    })
);

app.listen(port, () => {
    console.log("Server is running on port 3000");
});

db.sequelize.sync()
    .then((result) => {
        app.listen(3000, () => {
            console.log('server started');
        })
    })
        .catch((err) => {console.log(err);
        
    });

app.post("/Komik", async(req,res) => {
    const data = req.body;
    try{
        const Komik = await db.Komik.create(data);
        res.send(Komik);
    } catch(err){
        res.send(err);
    }
})

app.post("/Komik", async(req,res) => {
    try{
        const Komik = await db.Komik.findAll();
        res.send(Komik);
    } catch(err){
        res.send(err);
    }
})

app.put("/Komik/:id", async(req,res)=>{
    const id = req.params.id;
    const data = req.body;

    try{
        const Komik = awaitdb.Komik.findByPk(id);
        if (!Komik){
            return res.status(404).send({ message: "Komik tidak tersedia"});
        }
        await komik.update(data);
        res.send({ message: "Komik berhasil di update", komik});
    }catch(err){
        res.status(500).send(err);
    }
})

app.delete("/Komik/:id", async(req,res)=>{
    const id = req.params.id;

    try{
        const Komik = awaitdb.Komik.findByPk(id);
        if (!Komik){
            return res.status(404).send({ message: "Komik tidak tersedia"});
        }
        await komik.destroy();
        res.send({ message: "Komik berhasil di hapus", komik});
    }catch(err){
        res.status(500).send(err);
    }
})