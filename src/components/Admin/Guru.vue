<template>
    <div>
        <div class="container guru">
            <div class="row">
                <div class="col-lg-11 col-md-8">
                    <div class="card edt">
                            <h3 class="card-title jdl">Daftar Guru</h3>
                            <button class="btn btn-primary plus" data-toggle="modal" data-target="#addModal" @click="addModal=true,getMapel()"><i class="fas fa-plus"> Tambah</i></button>                            
                            <input class="form-control col-md-4 ml-3 mt-2" v-model="search" placeholder="Search" aria-label="Search">                                
                            <!-- alert -->
                            <div v-if="alertPlus" class="alert alert-success alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data Berhasil Ditambah!</strong>
                                <button type="button" class="close" data-dismiss="alert"  @click="alertPlus=false" aria-label="Close">
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
                                <button type="button" class="close" data-dismiss="alert"  @click="alertDel=false" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div v-if="alertEdt" class="alert alert-success alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data Berhasil Diupdate!</strong>
                                <button type="button" class="close" data-dismiss="alert"  @click="alertEdt=false" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <!-- end alert -->
                        <div class="card-body bd">
                            <table class="table table-striped">
                                <tr>
                                    <th>No</th>
                                    <th>Nama Guru</th>
                                    <th>Mapel 1</th>
                                    <th>Mapel 2</th>
                                    <th>Aksi</th>
                                </tr>     
                                <tr v-for="gurus, i in pageOfItems" :key="gurus.id_guru">
                                    <td>{{++i}}</td>
                                    <td style="text-transform:capitalize;">{{gurus.nama_g}}</td>
                                    <td>
                                        <div v-for="mapels in mapel" :key="mapels.id_mapel" :value="mapels.id_mapel" >
                                            <p v-if="gurus.mapel1===mapels.id_mapel" style="text-transform: uppercase;">{{mapels.mapel}}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div v-for="mapels in mapel" :key="mapels.id_mapel" :value="mapels.id_mapel" >
                                            <p v-if="gurus.mapel2===mapels.id_mapel" style="text-transform: uppercase;">{{mapels.mapel}}</p>
                                        </div>
                                    </td>
                                    <td style="text-align:center;">
                                        <a class="btn btn-secondary" data-toggle="modal" data-target="#detailModal" @click="detailModal=true,getData(gurus.id_guru),getMapel()"><i class="fas fa-clipboard"></i></a>
                                        <a class="btn btn-warning" data-toggle="modal" data-target="#editModal" @click="editModal=true,getData(gurus.id_guru),getMapel()"><i class="fas fa-edit" style="color:white;"></i></a>
                                        <a class="btn btn-danger" data-toggle="modal" data-target="#modalDel" @click="deleteModal=true,getData(gurus.id_guru),slice=i"><i class="fas fa-trash"></i></a>
                                    </td>
                                </tr>        
                            </table>
                            <div align="center">
                                <jw-pagination
                                    :items="filter"
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
                            <div class="modal-footer" v-for="dels in del" :key="dels.id_guru">
                                <button type="button" class="btn btn-secondary"  @click="deleteModal=false" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteModal=false,hapus(dels.id_guru,slice)">Hapus</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <!-- end modal delete -->
                    <!-- modal tambah -->
                    <div v-if="addModal" class="modal fade" id="addModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">Tambah Guru</h5>
                                    <button type="button"  @click="addModal=false" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form >
                                <div class="modal-body">                          
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">NIP</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="form.nip" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Status Pegawai</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="form.status_pegawai" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Nama</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="form.nama_g" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Jenis Kelamin</label>
                                                <div class="col-sm-8">
                                                    <select type="text" v-model="form.jenis_kelamin_g" class="form-control">
                                                        <option value="L">Laki-Laki</option>
                                                        <option Value="P">Perempuan</option>
                                                    </select>
                                                </div>
                                            </div>                                            
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Username Guru</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="form.u_guru" class="form-control">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Tempat</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="form.tempat_g" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Tanggal Lahir</label>
                                                <div class="col-sm-8">                                            
                                                    <input type="date" v-model="form.tgl_lahir" class="form-control">
                                                </div>
                                            </div>                                            
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Mapel 1</label>
                                                <div class="col-sm-8">
                                                    <select type="text" v-model="form.mapel1" class="form-control">
                                                        <option v-for="mapels in mapel" :key="mapels.id_mapel" :value="mapels.id_mapel" style="text-transform: uppercase;">{{mapels.mapel}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Mapel 2</label>
                                                <div class="col-sm-8">
                                                    <select type="text" v-model="form.mapel2" class="form-control">
                                                        <option v-for="mapels in mapel" :key="mapels.id_mapel" :value="mapels.id_mapel" style="text-transform: uppercase;">{{mapels.mapel}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                        
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
                     <!-- modal detail -->
                    <div v-if="detailModal" class="modal fade" id="detailModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">Detail Guru</h5>
                                    <button type="button"  @click="detailModal=false" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form >
                                <div class="modal-body">                          
                                    <div class="row" v-for="forms in form" :key="forms.id_guru">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">NIP</label>
                                                <div class="col-sm-8">
                                                    <p class="form-control">{{forms.nip}}</p>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Status Pegawai</label>
                                                <div class="col-sm-8">
                                                    <p class="form-control">{{forms.status_pegawai}}</p>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Nama</label>
                                                <div class="col-sm-8">
                                                    <p class="form-control">{{forms.nama_g}}</p>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Jenis Kelamin</label>                                                
                                                <div class="col-sm-8">
                                                    <p v-if="forms.jenis_kelamin_g === 'L'" class="form-control">Laki-Laki</p>
                                                    <p v-if="forms.jenis_kelamin_g === 'P'" class="form-control">Perempuan</p>
                                                </div>                                                
                                            </div>                                            
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Username Guru</label>
                                                <div class="col-sm-8">
                                                    <p class="form-control" style="text-transform:uppercase;">{{forms.u_guru}}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Tempat</label>
                                                <div class="col-sm-8">
                                                    <p class="form-control">{{forms.tempat_g}}</p>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Tanggal Lahir</label>
                                                <div class="col-sm-8">                                            
                                                    <p type="date" class="form-control">{{forms.tgal_lahir}}</p>
                                                </div>
                                            </div>                                            
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Mapel 1</label>
                                                <div class="col-sm-8">
                                                    <div v-for="mapels in mapel" :key="mapels.id_mapel" :value="mapels.id_mapel" >
                                                        <p v-if="forms.mapel1===mapels.id_mapel" style="text-transform: uppercase;" class="form-control">{{mapels.mapel}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Mapel 2</label>
                                                <div class="col-sm-8">
                                                    <div v-for="mapels in mapel" :key="mapels.id_mapel" :value="mapels.id_mapel" >
                                                        <p v-if="forms.mapel2===mapels.id_mapel" style="text-transform: uppercase;" class="form-control">{{mapels.mapel}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                        
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"  @click="addModal=false" data-dismiss="modal">Close</button>
                                    <!-- <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="addModal=false,AddData()">Submit</button> -->
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end modal detail -->
                    <!-- modal edit -->
                    <div v-if="editModal" class="modal fade" id="editModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">Edit Guru</h5>
                                    <button type="button"  @click="editModal=false" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                 <form >
                                <div class="modal-body" v-for="edt in form" :key="edt.id_guru">                          
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">NIP</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="edt.nip" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Status Pegawai</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="edt.status_pegawai" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Nama</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="edt.nama_g" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Jenis Kelamin</label>
                                                <div class="col-sm-8">
                                                    <select type="text" v-model="edt.jenis_kelamin_g" class="form-control">
                                                        <option value="L">Laki-Laki</option>
                                                        <option Value="P">Perempuan</option>
                                                    </select>
                                                </div>
                                            </div>                                            
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Username Guru</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="edt.u_guru" class="form-control" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Tempat</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="edt.tempat_g" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Tanggal Lahir</label>
                                                <div class="col-sm-8">                                            
                                                    <input type="date" v-model="edt.tgl_lahir" class="form-control">
                                                </div>
                                            </div>                                            
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Mapel 1</label>
                                                <div class="col-sm-8">
                                                    <select type="text" v-model="edt.mapel1" class="form-control">
                                                        <option v-for="mapels in mapel" :key="mapels.id_mapel" :value="mapels.id_mapel" style="text-transform: uppercase;">{{mapels.mapel}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Mapel 2</label>
                                                <div class="col-sm-8">
                                                    <select type="text" v-model="edt.mapel2" class="form-control">
                                                        <option v-for="mapels in mapel" :key="mapels.id_mapel" :value="mapels.id_mapel" style="text-transform: uppercase;">{{mapels.mapel}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                        
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
    name:'Guru',
    data() {
        return{
            search:'',
            guru:[],
            del:[],
            edt:{},
            slice:[],
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
            mapel:[],
            addModal:false,
            detailModal:false,
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
        this.getMapel();
    },
    computed:{

        filter(){
            return this.guru.filter((gurus)=>{
                return gurus.nama_g.includes(this.search)
            })
        }
        
    },
    methods:{
        onChangePage(pageOfItems) {
        // update page of items
        this.pageOfItems = pageOfItems;
        },
    showAll() {
        axios
            .get("http://localhost/api/guru")
            .then((response) => {
            this.guru = response.data.data;
            console.log(response.data.message);            
            });
    },
    getMapel(){
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
            url: 'http://localhost/api/guru/',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:params,
        })
        .then((res)=> {
            console.log(res.data.message)            
            this.guru.splice(slice, 1)
            this.showAll()            
            this.alertDel=true
        })
    },
    getData(id){
        axios.get("http://localhost/api/guru/",{params:{id:id}})
        .then((res) => {
            this.del = res.data.data
            this.form = res.data.data
            console.log(res.data.message)
        })
    },
    AddData(){
        
        axios
        .post("http://localhost/api/guru", this.form)
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
        const id_guru = this.form[0].id_guru
        const nip = this.form[0].nip
        const u_guru = this.form[0].u_guru
        const status_pegawai = this.form[0].status_pegawai    
        const nama_g = this.form[0].nama_g
        const jenis_kelamin_g = this.form[0].jenis_kelamin_g
        const tempat_g = this.form[0].tempat_g
        const tgal_lahir = this.form[0].tgal_lahir        
        const mapel1 = this.form[0].mapel1
        const mapel2 = this.form[0].mapel2
        const params = new URLSearchParams();
        params.append('id_guru', id_guru);
        params.append('nip',nip);
        params.append('u_guru',u_guru);
        params.append('status_pegawai',status_pegawai);        
        params.append('nama_g',nama_g);
        params.append('jenis_kelamin',jenis_kelamin_g);
        params.append('tempat',tempat_g);
        params.append('tgl_lahir',tgal_lahir);
        params.append('mapel1',mapel1);
        params.append('mapel2',mapel2);
        
        axios({
            method: 'put',
            url: 'http://localhost/api/guru/',
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
.guru{
    margin-left:205px !important;
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