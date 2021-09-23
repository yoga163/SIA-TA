<template>
    <div>
         <div class="container profile">
            <div class="row">
                <div class="col-lg-10 col-md-8">
                    <div class="card edt">                        
                            <h4 class="card-title jdl">Biodata Guru</h4>
                            <hr style="width:200px;items-align:left;margin-left:20px;margin-bottom:20px;border:1px solid">
                            <div v-if="alertEdt" class="alert alert-success alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data Berhasil Diupdate!</strong>
                                <button type="button" class="close" data-dismiss="alert"  @click="alertEdt=false" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        <form>
                        <div class="card-body bd">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label  class="col-sm-4 col-form-label">NIP</label>
                                        <div class="col-sm-8">
                                            <input type="text" v-model="user.nip" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label  class="col-sm-4 col-form-label">Status Pegawai</label>
                                        <div class="col-sm-8">
                                            <input type="text" v-model="user.status_pegawai" class="form-control">
                                        </div>
                                    </div><div class="form-group row">
                                        <label  class="col-sm-4 col-form-label">Nama</label>
                                        <div class="col-sm-8">
                                            <input type="text" v-model="user.nama_g" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label  class="col-sm-4 col-form-label">Jenis Kelamin</label>
                                        <div class="col-sm-8">
                                            <select type="text" v-model="user.jenis_kelamin_g" class="form-control">
                                                <option value="L">Laki-Laki</option>
                                                <option value="P">Perempuan</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label  class="col-sm-4 col-form-label">Tempat</label>
                                        <div class="col-sm-8">
                                            <input type="text" v-model="user.tempat_g" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label  class="col-sm-4 col-form-label">Tanggal Lahir</label>
                                        <div class="col-sm-8">
                                            <input type="date" v-model="user.tgal_lahir" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label  class="col-sm-4 col-form-label">Mapel 1</label>
                                        <div class="col-sm-8">
                                            <select v-model="user.mapel1" type="number" class="form-control">
                                                <option v-for="mapels in mapel" :key="mapels.id_mapel" :value="mapels.id_mapel">{{mapels.mapel}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label  class="col-sm-4 col-form-label">Mapel 2</label>
                                        <div class="col-sm-8">
                                            <select v-model="user.mapel2" type="number" class="form-control">
                                                <option v-for="mapels in mapel" :key="mapels.id_mapel" :value="mapels.id_mapel">{{mapels.mapel}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class=" d-flex justify-content-end mt-2">
                                <a class="btn btn-primary" @click="editData()">Update</a>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>   
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
    name:"Profile-g",
    data() {
        return{           
            mapel:[],
            form:{
                id_guru: '',
                nip: '',
                u_guru:'',
                status_pegawai : '',
                nama_g : '',                
                jenis_kelamin_g : '',                
                tempat_g:'',
                tgal_lahir:'',
                mapel1:'',
                mapel2 : '',
            },
            alertEdt:false,
        }
        
    },
    computed: {
        ...mapState({
        user: state => state.auth.user
        }),
    },
    created(){
        this.showAll()       
    },
    methods:{
    showAll() {
        axios
            .get("http://localhost/api/mapel")
            .then((response) => {
            this.mapel = response.data.data;
            console.log(response.data.message);            
            });
    },   
    editData(){        
        const id_guru = this.user.id_guru
        const nip = this.user.nip
        const u_guru = this.user.u_guru
        const status_pegawai = this.user.status_pegawai    
        const nama_g = this.user.nama_g
        const jenis_kelamin_g = this.user.jenis_kelamin_g
        const tempat_g = this.user.tempat_g
        const tgal_lahir = this.user.tgal_lahir        
        const mapel1 = this.user.mapel1
        const mapel2 = this.user.mapel2
        const data = new URLSearchParams();
        data.append('id_guru', id_guru);
        data.append('nip',nip);
        data.append('u_guru',u_guru);
        data.append('status_pegawai',status_pegawai);        
        data.append('nama_g',nama_g);
        data.append('jenis_kelamin_g',jenis_kelamin_g);
        data.append('tempat_g',tempat_g);
        data.append('tgal_lahir',tgal_lahir);
        data.append('mapel1',mapel1);
        data.append('mapel2',mapel2);                
        axios({
            method: 'put',
            url: 'http://localhost/api/guru/',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:data,
        })
        .then((res)=>{
            console.log(res.data.message)
            this.showAll()
            this.alertEdt = true
        })
    }
    }
}
</script>
<style>
.profile{
    margin-left:220px !important;
    padding-top: 35px;
}

.edt{
    padding-right: 20px;
    padding-left: 40px;
}
.bd{
    padding-left: 20px;
}
.jdl{
    margin-left: 30px;
    margin-bottom: 0px !important;
}
table{
    width: 600px;
}
.plus{
    width: 170px;
    margin-left: 20px;
}
th{
    background-color: grey;
    color:white;
    padding-left: 10px;
    text-align: center;
    padding:8px
}
td{
    padding: 10px;
}
</style>
