const express = require('express');
const app = express();
const { Jobs } = require('../database/index')

app.use(express.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET');
  res.header('Access-Control-Allow-Methods','POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/allJobs', (req, res) => {
  Jobs.findAll()
    .then(jobs => {
      const formattedJobs = jobs.map(job => {
        return {
          id: job.id,
          company: job.company,
          role: job.role,
          link: job.link,
          description: job.description
        }
      });
      res.status(200).send(formattedJobs);
    })
    .catch(err => console.error(err));
});

app.post('/formSubmit', (req, res) => {
  console.log(req)
  Jobs.create(req.body)
    .then(response => {
      res.status(201).send('created')
    })
    .catch(err => console.error(err))
});

app.listen(3001, function () {
  console.log('Records API listening on port 3001!')
});