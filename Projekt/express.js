// const express = require('express');
// const app = express();
// // const route = require('./data')

// const products = [
//     {name: 'product 1', id: '1'},
//     {name: 'product 2', id:'2'}
// ];

// app.get('/products', (req,res) => {
//     res.json(products);
// });

// app.get('/student', function(req, res){
//     res.json("student: h18linwe@du.se")
// })

// app.use(express.json());

// app.post('/product/', (req, res) =>
// {
//     const data = req.body;
//     const found = products.find((p)=> {
//         return p.id == data.id;
//     });
//     if(!found) {
//         products.push(data);
//         res.json({status: 'ok'});
//     }
//     else {
//         res.send('duplicate id for product with id:' + data.id);
//     }
// })
// app.listen(3000);