# Lambda Genetics

An attempt to build a genetic algorithm engine that runs on AWS Lambda

## How To Run

```
sls deploy
sls invoke -f kicker
sls logs -f looper -t
```

## How Does It Work?

Each section of the algorithm implemented as a lambda function, which called in a loop

```
                    /- kicks in the process
         +--------+ 
 HTTP -> | kicker |
         +--------+
              |
              V     /- tracks generations 
         +--------+
    *--->| looper |
    |    +--------+
    |         |
    |         V      /- creates new population
    |   +----------+
    |   | populate |
    |   +----------+
    |         |
    |         V       /- kicks in calculations batch and collects results
    |   +-----------+
    |   | aggregate |--+---+---+....+
    |   +-----------+  |   |   |    |
    |        |         V   |   |    |  
    \________/      *------V---|----|-----*
                    | *--------V----|-------*
                    * | *-----------V---------*
                      * | *---------------------*
                        * |   calculate score   |
                          *---------------------*
```

  

## Copyright & License

All code in this repository released under the terms of the ISC license

Copyright (C) 2019 Nikolay Nemshilov
