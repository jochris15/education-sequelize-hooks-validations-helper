const { formatIDR } = require('../helpers/formatter');
const { Game, Manager, Event } = require('../models/index')

class EventController {
    static async read(req, res) {
        try {
            const events = await Event.findAll()

            res.render("events", { events, formatIDR })
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }

    static async detail(req, res) {
        try {
            const { id } = req.params
            const event = await Event.findByPk(id, {
                include: {
                    model: Game,
                    include: Manager
                }
            })

            res.render("detailEvent", { event })
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }

    static async addForm(req, res) {
        try {
            const games = await Game.findAll()

            res.render("addForm", { games, errors: [] })
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }

    static async add(req, res) {
        try {
            const { name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, GameId } = req.body

            await Event.create({ name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, GameId })

            res.redirect('/events')
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                const errors = err.errors.map((el) => el.message)
                const games = await Game.findAll()

                res.render("addForm", { games, errors })
            } else {
                res.send(err)
            }
        }
    }

    static async editForm(req, res) {
        try {
            const { id } = req.params
            const games = await Game.findAll()
            const event = await Event.findByPk(id)

            res.render("editForm", { games, event, errors: [] })
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }

    static async edit(req, res) {
        const { id } = req.params
        try {
            const { name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, GameId } = req.body

            await Event.update({ name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, GameId }, {
                where: {
                    id
                }
            })

            res.redirect('/events')
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                const errors = err.errors.map((el) => el.message)
                const games = await Game.findAll()
                const event = await Event.findByPk(id)

                res.render("addForm", { games, event, errors })
            } else {
                res.send(err)
            }
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params

            await Event.destroy({
                where: {
                    id
                }
            })

            res.redirect('/events')
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }
}

module.exports = EventController