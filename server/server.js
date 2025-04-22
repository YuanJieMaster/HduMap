const express = require('express');
const cors = require('cors'); // 新增
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let instances = {};
let currentId = 1;

app.use(cors()); // 新增CORS中间件
app.use(bodyParser.json());
app.use(express.static('public')); // 确保public目录存在

app.get('/api/instances', (req, res) => {
    res.json(Object.values(instances));
});

app.post('/api/instances', (req, res) => {
    const instanceId = currentId++; // 先获取ID再自增
    const newInstance = {
        id: instanceId,
        name: `副本 ${instanceId}`, // 名称与ID一致
        created: new Date().toLocaleString(),
        data: req.body.data || { stamina: 100, score: 0, exp: 0 }
    };
    instances[newInstance.id] = newInstance;
    res.status(201).json(newInstance);
});

app.get('/api/instances/:id', (req, res) => {
    const instance = instances[req.params.id];
    instance ? res.json(instance) : res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});