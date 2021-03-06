const router = require('express').Router();
const { User, Career } = require('../../models');

router.post('/quicksearch', (req, res) => {
  // console.log(req.body);

  Career.create({
    title: req.body.title,
    employer: req.body.employer,
    location_city: req.body.location_city,
    location_state: req.body.location_state,
    publishing_site: req.body.publishing_site,
    apply_link: req.body.apply_link,
    job_latitude: req.body.job_latitude,
    job_longitude: req.body.job_longitude,
    user_id: req.session.user_id,
  })
    .then((qsDB) => res.json(qsDB))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  const savedJob = Career.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!savedJob) {
    res.status(404).json({ message: 'Job not found' });
  }
  res.status(200);
});

module.exports = router;
