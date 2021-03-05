module.exports = {
  getAllOccasions: (req, res) => {
    const db = req.app.get('db')

    db.occasion.get_all_occasions()
      .then(occ => res.status(200).send(occ))
      .catch(err => res.status(500).send(err))
  },
  getUserOccasion: async (req, res) => {
    const {occasion_user_id} = req.params;
    const db = req.app.get('db');

    await db.occasions
      .get_occasion(occasion_user_id)
      .then((occ) => res.status(200).send(occ))
      .catch((err) => console.log(err))
  },
  addOccasion: (req, res) => {
    const db = req.app.get('db')
    const {occasion_user_id, occasion_title, occasion_description, occasion_location, occasion_img} = req.params

    if(occasion_user_id){
      db.occasions.add_occasion([occasion_user_id, occasion_title, occasion_description, occasion_location, occasion_img])
      return res.sendStatus(200)
    }
    res.sendStatus(403)
  }
}

// getOccasion: (req, res) => {
//   req.app.get('db').occasions.get_occasion(req.params.id)
//     .then(occ => occ[0] ? res.status(200).send(occ[0]) : res.status(200).send({}))
// },