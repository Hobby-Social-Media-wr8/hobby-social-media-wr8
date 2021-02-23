module.exports = {
    createPost: (req, res) => {
        const {user_id} = req.session.user
        const {title, img, content}=req.body
        db = req.app.get('db')
        date = new Date
        console.log(user_id)

        if(user_id) {
            db.blog.create_post([user_id, title, img, content, date])
            return res.sendStatus(200)
        }
        res.sendStatus(403)
    },
    deletePost: (req, res) => {
        req.app.get('db').blog.delete_post(req.params.user_id)
        .then(_=>(res.sendStatus(200)))
    },

    //readPost is for individual post, readPosts is for all

    readPost: (req, res) => {
        req.app.get('db').blog.read_posts(req.params.id)
          .then(post => post[0] ? res.status(200).send(post[0]) : res.status(200).send({}))
      },
      readPosts: async (req, res) => {
        let { user_id } = req.session.user;
        let { mine, search, oldest } = req.query;
        const db = await req.app.get('db')

        if (mine && !search) {
          if (oldest) {
            db.blog.read_all_oldest_first()
              .then(posts => res.status(200).send(posts))
          } else {
            db.blog.read_all_posts()
              .then(posts => res.status(200).send(posts))
          }
        } else if (!mine && search) {
          if (oldest) {
            db.blog.search.search_other_oldest_first([`%${search.toLowerCase()}%`, user_id])
              .then(posts => res.status(200).send(posts))
          } else {
            db.blog.search.search_other_users_posts([`%${search.toLowerCase()}%`, user_id])
              .then(posts => res.status(200).send(posts))
          }
        } else if (mine && search) {
          if (oldest) {
            db.blog.search.search_all_oldest_first([`%${search.toLowerCase()}%`])
              .then(posts => res.status(200).send(posts))
          } else {
            db.blog.search.search_all_posts([`%${search.toLowerCase()}%`])
              .then(posts => res.status(200).send(posts))
          }
        } else {
          if (oldest) {
            db.blog.read_other_oldest_first([user_id])
              .then(posts => res.status(200).send(posts))
          } else {
            db.blog.read_other_users_posts([user_id])
              .then(posts => res.status(200).send(posts))
          }
        }
      },
}