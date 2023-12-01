import express from 'express'
import productRoute from './products'
import userRoute from './Users'

const router = express.Router()

const appRoutes = [
    {
        path:'/products',
        route: productRoute
    },
    {
        path:'/users',
        route: userRoute
    }
]

appRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

// default route
router.use('/', (req, res) => {
    res.json({statusCode:200, status:"success", message:"App up and Running"})
})

export default router;