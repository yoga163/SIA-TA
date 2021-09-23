<template>
    <div class="home container">
        <div class="row">
            <div class="col-md-4" style="margin-left: 50px;">
                <div>
                    <img src="@/assets/sma.png" class="mr-3" style="width: 300px; height: 320px;" loading="lazy">
                </div>
            </div>
            <div class="col-md-7" id="name">
                <div class="slmt" style="margin-top:50px;">
                    <h1>Selamat Datang <span v-if="level==1" style="text-transform: capitalize;" loading="lazy">{{user.u_name}}</span>
                    <span v-if="level==2" style="text-transform: capitalize !important;">{{user.nama}}</span>
                    <span v-if="level==3" style="text-transform: capitalize;">{{user.nama_g}}</span></h1>
                    <h3>Sistem Informasi Akademik</h3>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name:'Home',
      data(){
        return{      
            level:localStorage.getItem('level')
        };
    },
     computed: {
    ...mapState({
      user: state => state.auth.user
    })
    }
}
</script>
<style>
.home{
    margin-left:200px;
    padding-top: 100px;
}
.slmt{
    font-weight: 700;
    color:rgb(102, 102, 102);
}
</style>