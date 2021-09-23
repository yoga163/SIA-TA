<template>
    <div class="row">
        <div class="col-lg-6">
            <div class="container setting ">
                <div class="card ">                
                    <div class="card card-body">
                    <h3 class="card-tittle">Update Password</h3>
                    <div v-if="alertFail" class="alert alert-danger alert-dismissible fade show" role="alert" style="margin-top:10px;">
                        <strong>Password yang anda masukan salah!</strong>
                        <button type="button" @click="alertFail=false" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>         
                    <div class="form-group">
                        <input hidden v-model="form.id">
                        <label class="card-subtitle mb-2 mt-3 text-muted">Masukan Password Lama</label>
                        <input :type="type" v-model="form.old" class="form-control" required>
                        <input type="checkbox" @click="showPassword"><label style="font-size:13px;"> Show Password</label>                        
                    </div>
                    <br>
                    <div class="form-group">
                        <label class="card-subtitle mb-2 mt-3 text-muted">Masukan Password Baru</label>
                        <input :type="type" v-model="form.psw" class="form-control" required>                        
                    </div>                    
                    <input type="submit" value="UBAH" @click="update" class="btn btn-info w-25">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
export default {    
    name:'Setting',
    data() {
        return{
            type: 'password',            
            form:{
                id:localStorage.getItem('id'),
                old:'',
                psw:'',                
            },
            alertFail:false,
        }
    },   
    methods:{
        showPassword() {
            if(this.type === 'password') {
                this.type = 'text'
            } else {
                this.type = 'password'          
            }
        },

        update(){
            const id = this.form.id
            const old = this.form.old
            const psw = this.form.psw            
            const params = new URLSearchParams();
            params.append('id', id);
            params.append('old',old);
            params.append('psw',psw);            
            axios({
                method: 'put',
                url: 'http://localhost/api/setting/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data:params,
            })
            .then((res)=>{
                this.$store.dispatch("auth/LogOut");
                this.$router.push("/");           
                console.log(res.data.message)           
            })
            .catch((err)=>{
                this.alertFail=true
            })
        },       
    }
}
</script>
<style>
.setting{
    margin-left:220px !important;
    padding-top: 25px;
}
</style>