<template>
  <div class="dashboard">
    <Sidebar/>
    <div class="content">
      <Navbar/>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import {mapState } from "vuex";
import Sidebar from '../components/Sidebar.vue'
import Navbar from "../components/Navbar.vue"

export default {
  name: "dashboard",   
  data(){
    return{      
      level:localStorage.getItem('level'),
    };
  },
  components: {
    Sidebar,
    Navbar
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/LogOut");
      this.$router.push("/");
    },
  }
};
</script>
<style>

.navbar{
  margin-left:-23px;
  box-shadow: 3px 0px 10px grey;
  height:50px;
}
</style>