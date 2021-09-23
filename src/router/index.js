import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import admin from '../views/admin.vue'
import Home from '../components/Home.vue'
import Siswa from '../components/Admin/Siswa.vue'
import Guru from '../components/Admin/Guru.vue'
import Kelas from '../components/Admin/Kelas.vue'
import Mapel from '../components/Admin/Mapel.vue'
import User from '../components/Admin/User.vue'
import Akademik from '../components/Admin/Akademik.vue'
import Setting from '../components/Setting.vue'
import ProfileG from '../components/Guru/profile-g.vue'
import ProfileS from '../components/Siswa/profile-s.vue'
import Nilai from '../components/Siswa/Nilai.vue'
import NilaiG from '../components/Guru/Nilai-g.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: admin,
    children:[
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },
      {
        path: '/user',
        name: 'User',
        component: User,
      },
      {
        path: '/siswa',
        name: 'Siswa',
        component: Siswa,
      },      
      {
        path: '/guru',
        name: 'Guru',
        component: Guru,
      },
      {
        path: '/kelas',
        name: 'Kelas',
        component: Kelas,
      },
      {
        path: '/mapel',
        name: 'Mapel',
        component: Mapel,
      },
      {
        path: '/akademik',
        name: 'Akademik',
        component: Akademik,
      },
      {
        path: '/setting',
        name: 'Setting',
        component: Setting,
      },
      {
        path: '/profile-g',
        name: 'ProfileG',
        component: ProfileG,
      },
      {
        path: '/profile-s',
        name: 'ProfileS',
        component: ProfileS,
      },
      {
        path: '/nilai',
        name: 'Nilai',
        component: Nilai,
      },
      {
        path: '/nilai-g',
        name: 'NilaiG',
        component: NilaiG,
      },
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const authenticated = JSON.parse(localStorage.getItem('authenticated'))
  if (to.name !== 'Login' && !authenticated) {next('/')}
  else if (to.name ==='Login' && authenticated) {next('/home')}
  // else if (to.name ==='Dashboard' && authenticated) {next('/home')}
  else {next()}
});


export default router
