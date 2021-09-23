<template>
  <div>
    <div class="container-fluid bg">
      <div class=" bgH d-flex justify-content-center shadow align-items-center">
        <img class="logo" alt="Logo SMA" :src="require('@/assets/sma.png')" width="100" />
        <h2 class="title">SMA N 1 Karangrayung</h2>
      </div>
      <div class="row">
        <div class="col"></div>
        <div class="col-md-9 d-flex justify-content-center align-items-center">
          <div class="login col-md-6 col-sm-4 px-5 py-4 shadow rounded bg-white text-left">
            <div class="col-12 form-group">
              <h4 class="log">Login</h4>
              <h6 class="log">Sistem Informasi Akademik</h6>
            </div>
            <div class="alert alert-danger" v-if="showError" id="error">Username or Password is incorrect              
            </div>
            <form @submit.prevent="submit">
              <div class="row">
                <div class="col-12 form-group">
                  <label class="col-form-label">Username <span class="text-danger">*</span></label>
                  <input
                    type="text"
                    class="form-control form-control-md"
                    v-model="form.username"
                    placeholder="Username"
                  />
                </div>
                <div class="col-12 form-group">
                  <label class="col-form-label">Password <span class="text-danger">*</span></label>
                  <input
                    type="password"
                    class="form-control form-control-md"
                    v-model="form.password"
                    placeholder="Password"
                  />
                </div>
                <div class="col-12 form-group">
                  <button type="submit" class="btn btn-primary but">Login</button>
                </div>
              </div>
            </form>
            
          </div>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import VueRouter from 'vue-router'

export default {
  name: "Login",
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(['auth/LogIn']),
    async submit() {
      const { isNavigationFailure, NavigationFailureType } = VueRouter
      const data = new URLSearchParams();
      data.append("username", this.form.username);
      data.append("password", this.form.password);
      try {
        await this.$store.dispatch('auth/LogIn',data);
        this.$router.push('/dashboard').catch(failure => {
          if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
            this.$router.push({path:'/home'})
          }
        })
        localStorage.setItem('authenticated',true)
        this.showError = false;
      } catch (error) {
        console.log(error)
        this.showError = true;
      }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
body {
  background-color: rgba(236, 236, 236, 0.651);
  font-family: "Roboto", sans-serif;
}
.container-fluid {
  padding: 0px;
}
.logo {
  margin: -140px 0px 20px 0px;
  position: relative;
}
.log {
  font-weight: 600;
  text-align: center;
  margin-bottom: 15px;
}
.login {
  position: absolute;
  z-index: 1;
  margin-top: 200px;
}
.title {
  position: absolute;
  margin-top: 20px;
  color: white;
}
.bgH {
  height: 300px;
  background: #66a6ff;
  /* overflow-wrap:break-word; */
}
.bg{
  padding-right: 0px !important;
  padding-left:0px !important;
}
.but {
  margin-top: 20px;
  float: right;
  width: 100px;
}
@media (min-width: 768px) {
  .logo {
    margin: -140px 0px 20px 0px;
    position: relative;
  }
  .title {
    position: absolute;
    margin-top: 20px;
    color: white;
  }
}
</style>
