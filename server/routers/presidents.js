const { Router } = require('express')
const presidentController = require('../controllers/presidents')


const presidentRouter = Router()

presidentRouter.get('/', presidentController.index)
presidentRouter.get('/:name', presidentController.show)
presidentRouter.post('/', presidentController.create)
presidentRouter.delete('/:name', presidentController.destroy)
presidentRouter.patch('/:name', presidentController.update)
module.exports = presidentRouter