import Cart from "./components/Cart.vue"
import Profiles from "./components/Profiles.vue"
import Soups from "./components/Soups.vue"
import Landing from "./components/Landing.vue"
import Checkout from "./components/Checkout.vue"
import Finish from "./components/Finish.vue"
import Help from "./components/Help.vue"

export default [
    {path: "/Cart", component: Cart},
    {path: "/Profiles", component: Profiles},
    {path: "/Soups", component: Soups},
    {path: "/", component: Landing},
    {path: "/Checkout", component: Checkout},
    {path: "/Finish", component: Finish},
    {path: "/Help", component: Help}
]