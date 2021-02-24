module.exports = {
    getCalEvents:  (req, res) => {
        const db = req.app.get('db')

        db.events()
        .then(event => res.status(200).send(event))
        .catch(err => res.status(500).send(err))
    },
    addEvents: (req, res) => {
        const db = req.app.get('db')
        const {id, title, description, location, start, end} = req.params

        if(id){
        db.add_events([id, title, description, location, start, end])
        return res.sendStatus(200)
        }
        res.sendStatus(403)
    }
}