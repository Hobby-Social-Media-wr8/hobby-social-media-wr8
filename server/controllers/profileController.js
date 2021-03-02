module.exports = {
  getUserProfile: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");

    await db.profile
      .get_user_profile(id)
      .then((userProfile) => res.status(200).send(userProfile))
      .catch((err) => res.status(500).send(err));
  },
  editInfo: async (req, res) => {
    const { profile_id } = req.params;
    const { basic_info } = req.body;
    const db = req.app.get("db");

    await db.profile
      .edit_info(basic_info, profile_id)
      .then((userProfile) => res.status(200).send(userProfile))
      .catch((err) => res.status(500).send(err));
  },
};

// do i need to call it profile_user_id or does my sql file do that service and i'm just calling it whatever i need for the endpoint?
// do i need a get basic info sql and controller?
//  add in groups
