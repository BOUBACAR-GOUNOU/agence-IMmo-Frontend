import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
// lazy-loaded
const Profile = () => import("../components/Profil.vue")
const BoardAdmin = () => import("../components/BoardAdmin.vue")
const BoardModerator = () => import("../components/BoardModerator.vue")
const BoardUser = () => import("../components/BoardUser.vue")
const Bien_en_location = ()  => import("../views/Biens/Bien-en-location.vue")
const Bien_en_vente = ()  => import("../views/Biens/Bien-en-vente.vue")
const Bien_details  =  () => import("../views/Biens/Bien-details.vue")
const Location = () => import("../views/Operation/Location.vue")
const Achat =  () => import("../views/Operation/Achat.vue")
const Liste_client =  () => import("../views/Admin/Liste-client.vue")
const Liste_bien =  () => import("../views/Admin/Liste-bien.vue")
const Ad_bien =  () => import("../views/Admin/Ad-bien.vue")
const Editer_bien =  () => import("../views/Admin/Editer-bien.vue")
const Biens_loues =  () => import("../views/Users/Bien-location.vue")
const Biens_restitues =  () => import("../views/Users/Bien-restitues.vue")


const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: BoardModerator,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },
  
 /*  {
    path: '/bien/',
      alias: "/bien",
      name: "bienList",
      component: BienList,
  }, */

  {
    path: "/bien/en-location",
      alias: "/bien_en_location",
      name: "bien_en_location",
      component: Bien_en_location,
  },

  {
    path: "/bien/en-vente",
      alias: "/bien_en_vente",
      name: "bien_en_vente",
      component: Bien_en_vente,
  },

  {
    path: "/bien/details/:id",
      name: "bien-details",
      component: Bien_details,
  },

  {
    path: "/bien/operation/location/:id",
      name: "location-details",
      component: Location,
  },
  {
    path: "/bien/operation/achat/:id",
      name: "achat-details",
      component: Achat,
  },

  {
    path: "/admin/liste-bien",
      alias: "/admin-liste-bien",
      name: "admin-liste-bien",
      component: Liste_bien,
  },

  {
    path: "/admin/liste-client",
      alias: "/admin-liste-client",
      name: "admin-liste-client",
      component: Liste_client,
  },
  {
    path: "/admin/ad-bien",
      alias: "/admin-ad-bien",
      name: "admin-ad-bien",
      component: Ad_bien,
  },

  {
    path: "/admin/Editer-bien/:id",
      name: "admin-editer-bien",
      component: Editer_bien,
  },

  {
    path: "/user/biens-loues",
      alias: "/bien-loues",
      component: Biens_loues,
  },

  {
    path: "/user/biens-restitues",
      alias: "/bien-restitues",
      component: Biens_restitues,
  },
 
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
const publicPages = ['/login', '/register', '/home', '/', '/bien/en-location', '/bien/en-vente' ];
const authRequired = !publicPages.includes(to.path);
const loggedIn = localStorage.getItem('user');
// trying to access a restricted page + not logged in
// redirect to login page
if (authRequired && !loggedIn) {
  next('/login');
} else {
  next();
}
});

export default router;