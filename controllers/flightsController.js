const csv = require('csv-parser');
const fs = require('fs');
const dijkstra = require('../utils/dijkstra');

let voos = [];
let start = {};
let startContainer = {};
let nodes = [];
let nodesBridges = [];
let visiteds = [];
let nodesChildrens = [];


exports.getPrice = (req, res, next) => {
    const origin = req.params.origin;
    const destination = req.params.destination;

    fs.createReadStream('voos.csv')
        .pipe(csv())
        .on('data', (row) => {
            voos.push(row);

            console.log(row.origin, row.destination, row.price)

            if(!nodes.includes(row.origin)){
                nodes.push(row.origin)
            }

            if(!nodes.includes(row.destination)){
                nodes.push(row.destination)
            }

            if(origin == row.origin){
                start[row.destination] = row.price;
            }

            
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            startContainer[origin] = 0;


            nodes.forEach(function(airport){
                
                let children = {};
                children[airport] = {};

                voos.forEach(function(voo){
                    let vooFrom = voo.origin;
                    let vooTo = voo.destination;

                    if(vooFrom == airport){
                        
                        if(vooTo == destination) vooTo = 'finish';

                        children[airport][vooTo] = parseInt(voo.price);
                        nodesChildrens.push(children)
                    }
                })

                nodesBridges.push(nodesChildrens[nodesChildrens.length - 1])
            })

            const problem = {
                start: startContainer,
            }


            nodesBridges.forEach(function (node, i){
                let key = Object.keys(node)[0];
                problem[key] = node[key];
            })

            problem['finish'] = {};

            console.log(problem)

            console.log(dijkstra(problem))

            const lowerPrice = dijkstra(problem);
            lowerPrice.path = lowerPrice.path.filter(el => el != 'start');
            lowerPrice.path[lowerPrice.path.length - 1] = destination;


            const results = { 
                route: lowerPrice.path,
                price: lowerPrice.distance
            };

            res.status(200).send({
                mensagem: results
            });
        });
}