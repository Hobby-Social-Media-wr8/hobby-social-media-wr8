module.export = {
    getCalEvents:  (req, res) => {
        const db = req.app.get('db')

        db.events.get_events()
        .then(event => res.status(200).send(event))
        .catch(err => res.status(500).send(err))
    }
}