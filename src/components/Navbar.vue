<template>
    <div>
        <nav class="navbar navbar-light size">
            <div class="container-fluid ">
                <span class="navbar-brand mb-0 h1">SIA</span>
                <p class="logout " @click="logout">Sign Out <i class=" fas fa-sign-out-alt"></i></p>
            </div>        
        </nav>
    </div>
</template>
<script>

export default {
    name:'Navbar',
    setup() {
        
    },
     methods: {
    async logout() {
      await this.$store.dispatch("auth/LogOut");
      this.$router.push("/");
    },
  }
}
</script>
<style>

.navbar-brand{
    font-weight: 700 !important;
    color:rgb(56, 56, 56) !important;

}
.size{
    height: 70px !important;
    margin-left:200px !important;
    background-color: rgba(255, 255, 255, 0.884);
}
.logout{
    cursor: pointer;
    padding-right:20px ;
    font-weight: 600;
    margin-bottom: 0px;
    color:rgb(56, 56, 56);
}
</style>