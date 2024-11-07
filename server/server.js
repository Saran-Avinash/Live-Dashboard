const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.static("build"));
app.use(express.json());


let data = {
    labels: [],
    datasets: [{
        label: "Cpu Uitlization (100%)",
        data : [],
        borderColor: "red"
    }]
};

app.post('/api/cpuData', (req, res)=> {
    console.log(req.body);
    data.labels = [...data.labels, req.body.date.split(" ")[1]];
    data.datasets[0].data = [...data.datasets[0].data, req.body.cpu.toFixed(2)];
    console.log(data.labels);
    console.log(data.datasets[0]);
    res.json({data: req.body});
    res.sendStatus(200).send("Successfull");
   
});

app.get('/cpuData', (req, res)=> {
    res.json(data);
})
app.listen(PORT,() => {
    console.log(`Server listening on port ${PORT}`);
})