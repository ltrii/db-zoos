const express = require('express');
const helmet = require('helmet');

const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);


const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/api/zoos', (req, res) => {
  db('zoos').then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(err => res.status(500).json(err))
})

server.get('/api/zoos/:id', (req, res) => {
  const id = req.params.id
  db('zoos').where('id', id).then(zoo => {
    res.status(200).json(zoo);
  })
  .catch(err => res.status(500).json(err))
})

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;

  db.insert(zoo)
    .into('zoos')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


server.delete('/api/zoos/:id', (req, res) => {
  const id = req.params.id
  db('zoos').where('id', id).del().then(zoo => {
    res.status(200).json(zoo)
  })
  .catch(err => res.status(500).json(err))
})

server.put('/api/zoos/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db('zoos')
  .where('id', id)
  .update(changes).then(change => {
    res.status(200).json(change)
  })
  .catch(err => res.status(500).json(err))
})

server.get('/api/bears', (req, res) => {
  db('bears').then(bears => {
    res.status(200).json(bears);
  })
  .catch(err => res.status(500).json(err))
})

server.get('/api/bears/:id', (req, res) => {
  const id = req.params.id
  db('bears').where('id', id).then(bear => {
    res.status(200).json(bear);
  })
  .catch(err => res.status(500).json(err))
})

server.post('/api/bears', (req, res) => {
  const bear = req.body;

  db.insert(bear)
    .into('bears')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


server.delete('/api/bears/:id', (req, res) => {
  const id = req.params.id
  db('bears').where('id', id).del().then(bear => {
    res.status(200).json(bear)
  })
  .catch(err => res.status(500).json(err))
})

server.put('/api/bears/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db('bears')
  .where('id', id)
  .update(changes).then(change => {
    res.status(200).json(change)
  })
  .catch(err => res.status(500).json(err))
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
