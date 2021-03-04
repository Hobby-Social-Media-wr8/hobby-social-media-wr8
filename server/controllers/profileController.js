module.exports = {
  getUserProfile: async (req, res) => {
    const { profile_user_id } = req.params;
    const db = req.app.get("db");

    await db.profile
      .get_user_profile(profile_user_id)
      .then((userProfile) => res.status(200).send(userProfile))
      .catch((err) => res.status(500).send(err));
  },
  editInfo: async (req, res) => {
    const { profile_user_id } = req.params;
    const { basic_info } = req.body;
    const db = req.app.get("db");

    await db.profile
      .edit_info(basic_info, profile_user_id)
      .then((userProfile) => res.status(200).send(userProfile))
      .catch((err) => res.status(500).send(err));
  },
  editInterests: async (req, res) => {
    const { profile_user_id } = req.params;
    const { interests_list } = req.body;
    const db = req.app.get('db')

    await db.profile
    .edit_interests(interests_list, profile_user_id)
    .then((userProfile) => res.status(200).send(userProfile))
    .catch((err) => res.status(500).send(err))
  },
};
