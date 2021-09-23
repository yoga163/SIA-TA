<template>
    <div>
        <div class="container kelas">
            <div class="row">
                <div class="col-lg-9 col-md-8">
                    <div class="card edt">                        
                            <h3 class="card-title jdl">Daftar Kelas</h3>
                            <button class="btn btn-primary plus" data-toggle="modal" data-target="#addModal" @click="addModal=true,getGuru()"><i class="fas fa-plus"> Tambah</i></button>
                            <!-- alert -->
                            <div v-if="alertPlus" class="alert alert-success alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data Berhasil Ditambah!</strong>
                                <button type="button" class="close" data-dismiss="alert" @click="alertPlus1=false" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div v-if="alertPlus1" class="alert alert-danger alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data tidak Berhasil Ditambah!</strong>
                                <button type="button" class="close" data-dismiss="alert" @click="alertPlus1=false" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div v-if="alertDel" class="alert alert-success alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data Berhasil Dihapus!</strong>
                                <button type="button" class="close" data-dismiss="alert" @click="alertDel=false" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div v-if="alertEdt" class="alert alert-success alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data Berhasil Diupdate!</strong>
                                <button type="button" class="close" data-dismiss="alert" @click="alertEdt=false" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <!-- end alert -->
                        <div class="card-body bd">
                            <table class="table table-striped">
                                <tr>
                                    <th>No</th>
                                    <th>Kelas</th>
                                    <th>Wali Kelas</th>
                                    <th>Jumlah Murid</th>
                                    <th>Aksi</th>
                                </tr>     
                                <tr v-for="kelass, i in pageOfItems" :key="kelass.id_kelas">
                                    <td>{{++i}}</td>
                                    <td style="text-transform: uppercase;">{{kelass.kelas}} {{kelass.jurusan}}</td>
                                    <td style="text-transform: uppercase;">{{kelass.nama_g}}</td>
                                    <td style="text-align:center;">{{kelass.jumlah_siswa}}</td>
                                    <td style="text-align:center;">                                        
                                        <button class="btn btn-warning" data-toggle="modal" data-target="#editModal" @click="editModal = true,getData(kelass.id_kelas),getGuru()"><i class="fas fa-edit" style="color:white;"></i></button>
                                        <button class="btn btn-danger" data-toggle="modal" data-target="#modalDel" @click="deleteModal=true,getData(kelass.id_kelas),slice=i"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>        
                            </table>
                            <div align="center">
                                <jw-pagination 
                                    :items="kelas"
                                    :pageSize="5"
                                    @changePage="onChangePage"
                                ></jw-pagination>
                            </div>
                        </div>
                    </div>
                    <!-- modal delete -->
                    <div v-if="deleteModal" class="modal fade" id="modalDel" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Yakin akan dihapus</h5>
                                <button type="button"  @click="deleteModal=false" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <!-- <div class="modal-body">
                                
                            </div> -->
                            <div class="modal-footer" v-for="dels in del" :key="dels.id_kelas">
                                <button type="button" class="btn btn-secondary"  @click="deleteModal=false" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteModal=false,hapus(dels.id_kelas,slice)">Hapus</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <!-- end modal delete -->
                    <!-- modal tambah -->
                    <div v-if="addModal" class="modal fade" id="addModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">Tambah Kelas</h5>
                                    <button type="button"  @click="addModal=false" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form >
                                <div class="modal-body">
                                                                    
                                    <label>Wali Kelas</label>
                                    <select v-model="form.wali_kelas" type="number" class="form-control">
                                        <option v-for="gurus in guru" :key="gurus.id_guru" :value="gurus.id_guru">{{gurus.nama_g}}</option>
                                    </select>
                                    <label>Kelas</label>
                                    <input type="text" v-model="form.kelas" class="form-control">
                                    <label>Jurusan</label>
                                    <input type="text" v-model="form.jurusan" class="form-control">
                                    <label>Jumlah Siswa</label>
                                    <input type="text" v-model="form.jumlah_siswa" class="form-control">
                                                                
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"  @click="addModal=false" data-dismiss="modal">Cancel</button>
                                    <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="addModal=false,AddData()">Submit</button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end modal Add -->
                    <!-- modal edit -->
                    <div v-if="editModal" class="modal fade" id="editModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">Edit Kelas</h5>
                                    <button type="button"  @click="editModal=false" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form >
                                <div class="modal-body" v-for="edt in form" :key="edt.id_kelas">
                                                                    
                                    <label>Wali Kelas</label>
                                    <select v-model="edt.wali_kelas" type="number" class="form-control">
                                        <option v-for="gurus in guru" :key="gurus.id_guru" :value="gurus.id_guru">{{gurus.nama_g}}</option>
                                    </select>
                                    <label>Kelas</label>
                                    <input type="text" v-model="edt.kelas" class="form-control" disabled>
                                    <label>Jurusan</label>
                                    <input type="text" v-model="edt.jurusan" class="form-control" disabled>
                                    <label>Jumlah Siswa</label>
                                    <input type="text" v-model="edt.jumlah_siswa" class="form-control">
                                                                
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"  @click="editModal=false" data-dismiss="modal">Cancel</button>
                                    <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="editModal=false,editData()">Submit</button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end modal edit -->
                </div>
            </div>   
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'Kelas',
    data() {
        return{
            kelas:[],
            del:[],
            edt:{},
            slice:[],
            form:{
                id_kelas: '',
                wali_kelas: '',
                kelas : '',
                jurusan : '',                
                jumlah_siswa : '',                
            },
            guru:[],
            addModal:false,
            deleteModal:false,
            editModal:false,
            alertPlus:false,
            alertPlus1:false,
            alertDel:false,
            alertEdt:false,
            pageOfItems:[],
        }
    },
    created(){
        this.showAll();
    },
    methods:{
        onChangePage(pageOfItems) {
        // update page of items
        this.pageOfItems = pageOfItems;
        },
        getGuru(){
            axios
            .get("http://localhost/api/guru")
            .then((response) => {
            this.guru = response.data.data;
            console.log(response.data.message);            
            });
        },
    showAll() {
        axios
            .get("http://localhost/api/kelas")
            .then((response) => {
            this.kelas = response.data.data;
            console.log(response.data.message);            
            });
        },
    hapus(id,slice){  
        const params = new URLSearchParams();
        params.append('id', id);     
        axios({
            method: 'delete',
            url: 'http://localhost/api/kelas/',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:params,
        })
        .then((res)=> {
            console.log(res.data.message)            
            this.kelas.splice(slice, 1)
            this.showAll()            
            this.alertDel=true
        })
    },
    getData(id){
        axios.get("http://localhost/api/kelas/",{params:{id:id}})
        .then((res) => {
            this.del = res.data.data
            this.form = res.data.data
            console.log(res.data.message)  
        })
    },
    AddData(){
        
        axios
        .post("http://localhost/api/kelas", this.form)
        .then((response) => {
            console.log(response.data.message);   
            this.showAll()         
            this.alertPlus=true
        })
        .catch((error)=>{
            console.log(error)
            this.alertPlus1=true
        })
    },
    editData(){
        
        const id_kelas = this.form[0].id_kelas
        const wali_kelas = this.form[0].wali_kelas
        const kelas = this.form[0].kelas
        const jurusan = this.form[0].jurusan
        const jumlah_siswa = this.form[0].jumlah_siswa
        const params = new URLSearchParams();
        params.append('id_kelas', id_kelas);
        params.append('wali_kelas',wali_kelas);
        params.append('kelas',kelas);
        params.append('jurusan',jurusan);
        params.append('jumlah_siswa',jumlah_siswa);     
        axios({
            method: 'put',
            url: 'http://localhost/api/kelas/',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:params,
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
.kelas{
    margin-left:220px !important;
    padding-top: 30px;
}

.edt{
    padding-right: 20px;
    padding-left: 40px;

}
.bd{
    padding-left: 20px;
}
.jdl{
    margin-top: 30px;
    margin-left: 30px;
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
