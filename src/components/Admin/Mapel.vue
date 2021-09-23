<template>
    <div>
       <div class="container mapel">
            <div class="row">
                <div class="col-lg-7 col-sm-7 mb-4">
                    <div class="card edt">                        
                            <h3 class="card-title jdl">Daftar Mata Pelajaran</h3>
                            <button class="btn btn-primary plus" data-toggle="modal" data-target="#addModal" @click="addModal=true"><i class="fas fa-plus"> Tambah</i></button>
                            <!-- alert -->
                            <div v-if="alertPlus" class="alert alert-success alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data Berhasil Ditambah!</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div v-if="alertPlus1" class="alert alert-danger alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data tidak Berhasil Ditambah!</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div v-if="alertDel" class="alert alert-success alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data Berhasil Dihapus!</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div v-if="alertEdt" class="alert alert-success alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data Berhasil Diupdate!</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <!-- end alert -->
                        <div class="card-body bd">
                            <table class="table table-striped" >
                                <tr>
                                    <th>No</th>                                    
                                    <th>Mata Pelajaran</th>                                   
                                    <th>Aksi</th>
                                </tr>     
                                <tr v-for="mapels, i in pageOfItems" :key="mapels.id_mapel">
                                    <td style="text-align:center;">{{++i}}</td>                                   
                                    <td style="text-align:left;">{{mapels.mapel}}</td>                                    
                                    <td style="text-align:center;">                                       
                                        <button class="btn btn-warning" data-toggle="modal" data-target="#editModal" @click="editModal = true,getData(mapels.id_mapel)"><i class="fas fa-edit" style="color:white;"></i></button>
                                        <button class="btn btn-danger" data-toggle="modal" data-target="#modalDel" @click="deleteModal=true,getData(mapels.id_mapel),slice=i"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>        
                            </table>
                            <div align="center">
                                <jw-pagination 
                                    :items="mapel"
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
                            <div class="modal-footer" v-for="dels in del" :key="dels.id_mapel">
                                <button type="button" class="btn btn-secondary"  @click="deleteModal=false" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteModal=false,hapus(dels.id_mapel,slice)">Hapus</button>
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
                                    <label>Mata Pelajaran</label>
                                    <input type="text" v-model="form.mapel" class="form-control">                                    
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
                                    <label>Mata Pelajaran</label>
                                    <input type="text" v-model="edt.mapel" class="form-control">                                                                                                   
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
    name:'Mapel',
    data() {
        return{
            mapel:[],
            del:[],
            edt:{},
            slice:[],
            form:{
                id_mapel:'',
                mapel: '',
                               
            },
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
        showAll() {
        axios
            .get("http://localhost/api/mapel")
            .then((response) => {
            this.mapel = response.data.data;
            console.log(response.data.message);            
            });
    },
    hapus(id,slice){  
        const params = new URLSearchParams();
        params.append('id', id);     
        axios({
            method: 'delete',
            url: 'http://localhost/api/mapel/',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:params,
        })
        .then((res)=> {
            console.log(res.data.message)            
            this.mapel.splice(slice, 1)
            this.showAll()            
            this.alertDel=true
        })
    },
    getData(id){
        axios.get("http://localhost/api/mapel/",{params:{id:id}})
        .then((res) => {
            this.del = res.data.data
            this.form = res.data.data
            console.log(res.data.message)  
        })
    },
    AddData(){        
        axios
        .post("http://localhost/api/mapel", this.form)
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
        
        const id_mapel = this.form[0].id_mapel
        const mapel = this.form[0].mapel
       
        const params = new URLSearchParams();
        params.append('id_mapel', id_mapel);
        params.append('mapel',mapel);
            
        axios({
            method: 'put',
            url: 'http://localhost/api/mapel/',
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
.mapel{
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