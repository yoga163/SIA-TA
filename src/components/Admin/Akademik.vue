<template>
    <div>
       <div class="container akademik">
            <div class="row">
                <div class="col-lg-7 col-sm-7">
                    <div class="card edt">                        
                            <h3 class="card-title jdl">Daftar Akademik</h3>
                            <button class="btn btn-primary plus" data-toggle="modal" data-target="#addModal" @click="addModal=true"><i class="fas fa-plus"> Tambah</i></button>
                            <!-- alert -->
                            <div v-if="alertPlus" class="alert alert-success alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data Berhasil Ditambah!</strong>
                                <button type="button" class="close" data-dismiss="alert" @click="alertPlus=false" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div v-if="alertPlus1" class="alert alert-danger alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data tidak Berhasil Ditambah!</strong>
                                <button type="button" class="close" data-dismiss="alert" @click="alertPlus=false" aria-label="Close">
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
                            <table class="table table-striped" >
                                <tr>
                                    <th>No</th>       
                                    <th>Semester</th>                             
                                    <th>Tahun Akademik</th>                                   
                                    <th>Aksi</th>
                                </tr>     
                                <tr v-for="akademiks, i in akademik" :key="akademiks.id_ak">
                                    <td style="text-align:center;">{{++i}}</td>                                   
                                    <td style="text-align:center;">{{akademiks.semester}}</td>
                                    <td style="text-align:center;">{{akademiks.thn_akademik}}</td>                                    
                                    <td style="text-align:center;">                                       
                                        <a class="btn btn-warning" data-toggle="modal" data-target="#editModal" @click="editModal = true,getData(akademiks.id_ak)"><i class="fas fa-edit" style="color:white;"></i></a>
                                        <a class="btn btn-danger" data-toggle="modal" data-target="#modalDel" @click="deleteModal=true,getData(akademiks.id_ak),slice=i"><i class="fas fa-trash"></i></a>
                                    </td>
                                </tr>        
                            </table>
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
                            <div class="modal-footer" v-for="dels in del" :key="dels.id_ak">
                                <button type="button" class="btn btn-secondary"  @click="deleteModal=false" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteModal=false,hapus(dels.id_ak,slice)">Hapus</button>
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
                                    <h5 class="modal-title" id="staticBackdropLabel">Tambah Mata Pelajaran</h5>
                                    <button type="button"  @click="addModal=false" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form >
                                <div class="modal-body">                                                                                                   
                                    <label>Tahun Akademik</label>
                                    <input type="text" v-model="form.thn_akademik" class="form-control">
                                    <label>Semester</label>
                                    <select type="text" v-model="form.semester" class="form-control">
                                        <option value="Genap">Genap</option>
                                        <option value="Ganjil">Ganjil</option>
                                    </select>                          
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
                                <div class="modal-body" v-for="edt in form" :key="edt.id_mapel">                                                                                                       
                                    <label>Tahun Akademik</label>
                                    <input type="text" v-model="edt.thn_akademik" class="form-control">
                                    <label>Semester</label>
                                    <select type="text" v-model="edt.semester" class="form-control">
                                        <option value="Genap">Genap</option>
                                        <option value="Ganjil">Ganjil</option>
                                    </select>                                                                                                       
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"  @click="editModal=false" data-dismiss="modal">Cancel</button>
                                    <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="editModal=false,editData()">Submit</button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end modal Edit -->
                </div>
            </div>   
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'Akademik',
    data() {
        return{
            akademik:[],
            del:[],
            edt:{},
            slice:[],
            form:{
                id_ak:'',
                thn_akademik: '',
                semester: '',
            },
            addModal:false,
            deleteModal:false,
            editModal:false,
            alertPlus:false,
            alertPlus1:false,
            alertDel:false,
            alertEdt:false,
        }
    },
    created(){
        this.showAll();
    },
    methods:{
        showAll() {
        axios
            .get("http://localhost/api/akademik")
            .then((response) => {
            this.akademik = response.data.data;
            console.log(response.data.message);            
            });
        },
        hapus(id,slice){  
            const params = new URLSearchParams();
            params.append('id', id);
            axios({
                method: 'delete',
                url: 'http://localhost/api/akademik/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data:params,
            })
            .then((res)=> {
                console.log(res.data.message)            
                this.akademik.splice(slice, 1)
                this.showAll()            
                this.alertDel=true
            })
        },
        getData(id){
            axios.get("http://localhost/api/akademik/",{params:{id:id}})
            .then((res) => {
                this.del = res.data.data
                this.form = res.data.data
                console.log(res.data.message)  
            })
        },
        AddData(){        
            axios
            .post("http://localhost/api/akademik", this.form)
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
            
            const id_ak = this.form[0].id_ak
            const thn_akademik = this.form[0].thn_akademik
            const semester = this.form[0].semester
        
            const params = new URLSearchParams();
            params.append('id_ak', id_ak);
            params.append('thn_akademik',thn_akademik);
            params.append('semester',semester);
                
            axios({
                method: 'put',
                url: 'http://localhost/api/akademik/',
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
.akademik{
    margin-left:220px !important;
    padding-top: 50px;
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