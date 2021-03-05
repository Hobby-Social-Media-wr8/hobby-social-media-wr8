module.exports = {
    createGroup: (req, res ) => {
        const {user_id} = req.session.user
        const {group_name, group_location, group_text, group_instruments, url, group_needed_members} = req.body;
        db = req.app.get("db")
        if (user_id){
            db.groups.create_group([group_name, group_location, group_text, group_instruments, url, group_needed_members, user_id])
            return res.sendStatus(200)
        }
        res.sendStatus(403)
    },
    readGroups: async (req, res) => {
        const db = req.app.get("db")
        const allGroups = await db.groups.read_all_groups()
        return res.status(200).send(allGroups)
    },
    deleteGroup:(req, res) => {
        req.app.get("db").groups.delete_group(req.params.user_id)
        .then(_=>res.sendStatus(200))
    }

}