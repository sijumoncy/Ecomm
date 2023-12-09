import express from 'express'
import productRoute from './products'
import userRoute from './Users'
import authRoute from './auth'
import cartRoute from './cart'
import categoryRoute from './category'
import orderRoute from './order'
import OrderItemRoute from './orderItem'

const router = express.Router()

const appRoutes = [
    {
        path:'/products',
        route: productRoute
    },
    {
        path:'/users',
        route: userRoute
    },
    {
        path:'/cart',
        route: cartRoute
    },
    {
        path:'/auth',
        route: authRoute
    },
    {
        path:'/category',
        route: categoryRoute
    },
    {
        path:'/order',
        route: orderRoute
    },
    {
        path:'/order-item',
        route: OrderItemRoute
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