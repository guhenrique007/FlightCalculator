# FlightCalculator

Application to calculate the lowest possible travel ticket price (considering different routes) with Dijkstra's algorithm.

The file 'voos.csv' has some informations of route and your price.

```
GRU,BRC,10
GRU,SCL,18
GRU,ORL,56
GRU,CDG,75
SCL,ORL,20
BRC,SCL,5
ORL,CDG,5
```

To research the price of a route, must call:

- Request
  GET /quote/GRU/ORL
  
* Installation instructions
