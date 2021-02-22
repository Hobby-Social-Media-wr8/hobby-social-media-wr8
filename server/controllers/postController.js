module.exports = {
    createPost: (req, res) => {
        const {id} = req.session.user
        const {title, img, content}=req.body
        db = req.app.get('db')
        date = new Date

        if(id) {
            db.blog.create_post([id, title, img, content, date])
            return res.sendStatus(200)
        }
        res.sendStatus(403)
    },
    deletePost: (req, res) => {
        req.app.get('db').blog.delete_post(req.params.id)
        .then(_=>(res.sendStatus(200)))
    },

    readPost: (req, res) => {
        req.app.get('db').blog.read_posts(req.params.id)
          .then(post => post[0] ? res.status(200).send(post[0]) : res.status(200).send({}))
      }
}