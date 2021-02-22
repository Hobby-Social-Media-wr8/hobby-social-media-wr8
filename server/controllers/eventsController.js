module.export = {
    getEvents: async(req, res) => {
        const  {search} = req.query
        const db = req.app.get('db')

        await db.events.search_events([`%${search.toLowerCase()}%`])
        .then(orderItems => res.status(200).send(orderItems))
        .catch(err => res.status(500).send(err))
    }
    
}