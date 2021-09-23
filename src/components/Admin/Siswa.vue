<template>
    <div>
        <div class="container siswa">
            <div class="row">
                <div class="col-lg-10 col-md-8">
                    <div class="card edt">                        
                            <h3 class="card-title jdl">Daftar Siswa</h3>
                            <button class="btn btn-primary plus" data-toggle="modal" data-target="#addModal" @click="addModal=true,getKelas()"><i class="fas fa-plus"> Tambah</i></button>                            
                            <form class="form-inline search">
                                <input class="form-control" v-model="search" placeholder="Search" aria-label="Search">
                            </form>                            
                            <!-- alert -->
                            <div v-if="alertPlus" class="alert alert-success alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data Berhasil Ditambah!</strong>
                                <button type="button" class="close" data-dismiss="alert" @click="alertPlus=false" aria-label="Close">
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
                                    <th>NISN</th>
                                    <th>Nama Siswa</th>
                                    <th>Kelas</th>
                                    <th>Aksi</th>
                                </tr>     
                                <tr v-for="siswas, i in pageOfItems" :key="siswas.id_siswa">
                                    <td>{{++i}}</td>
                                    <td>{{siswas.nisn}} </td>
                                    <td style="text-transform: uppercase;">{{siswas.nama}}</td>
                                    <td style="text-align:left;">{{siswas.kelas}} {{siswas.jurusan}}</td>
                                    <td style="text-align:center;">
                                        <a class="btn btn-secondary" data-toggle="modal" data-target="#detailModal" @click="detailModal=true,getData(siswas.id_siswa,kelas=0),getKelas()"><i class="fas fa-clipboard"></i></a>
                                        <a class="btn btn-warning" data-toggle="modal" data-target="#editModal" @click="editModal=true,getData(siswas.id_siswa,kelas=null),getKelas()"><i class="fas fa-edit" style="color:white;"></i></a>
                                        <a class="btn btn-danger" data-toggle="modal" data-target="#modalDel" @click="deleteModal=true,getData(siswas.id_siswa),slice=i"><i class="fas fa-trash"></i></a>
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
                            <div class="modal-footer" v-for="dels in del" :key="dels.id_siswa">
                                <button type="button" class="btn btn-secondary"  @click="deleteModal=false" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteModal=false,hapus(dels.id_siswa,slice)">Hapus</button>
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
                                    <h5 class="modal-title" id="staticBackdropLabel">Tambah Siswa</h5>
                                    <button type="button"  @click="addModal=false" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form >
                                <div class="modal-body">                          
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">NISN</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="form.nisn" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">NIK</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="form.nik" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Nama</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="form.nama" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Jenis Kelamin</label>
                                                <div class="col-sm-8">
                                                    <select type="text" v-model="form.jenis_kelamin" class="form-control">
                                                        <option value="L">Laki-Laki</option>
                                                        <option Value="P">Perempuan</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">No HP</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="form.no_hp" class="form-control">
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Tempat</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="form.tempat" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Tanggal Lahir</label>
                                                <div class="col-sm-8">                                            
                                                    <input type="date" v-model="form.tgl_lahir" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group row mb-4">
                                                <label  class="col-sm-4 col-form-label">Alamat</label>
                                                <div class="col-sm-8">
                                                    <textarea type="text" v-model="form.alamat" class="form-control"></textarea>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Kelas</label>
                                                <div class="col-sm-8">
                                                    <select type="text" v-model="form.kelas" class="form-control">
                                                        <option v-for="kelass in kelas" :key="kelass.id_kelas" :value="kelass.id_kelas" style="text-transform: uppercase;">{{kelass.kelas}} {{kelass.jurusan}}</option>
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
                                    <h5 class="modal-title" id="staticBackdropLabel">Detail Siswa</h5>
                                    <button type="button"  @click="detailModal=false" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form >
                                <div class="modal-body" v-for="forms in form" :key="forms.id_siswa">                          
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">NISN</label>
                                                <div class="col-sm-8">
                                                    <p type="text"  class="form-control">{{forms.nisn}}</p>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">NIK</label>
                                                <div class="col-sm-8">
                                                    <p type="text" class="form-control">{{forms.nik}}</p>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Nama</label>
                                                <div class="col-sm-8">
                                                    <p type="text" class="form-control">{{forms.nama}}</p>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Jenis Kelamin</label>
                                                <div class="col-sm-8">
                                                    <p type="text" v-if="forms.jenis_kelamin === 'L'" class="form-control">Laki-Laki</p>
                                                    <p type="text" v-if="forms.jenis_kelamin === 'P'" class="form-control">Perempuan</p>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">No HP</label>
                                                <div class="col-sm-8">
                                                    <p type="text"  class="form-control">{{forms.no_hp}}</p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Tempat</label>
                                                <div class="col-sm-8">
                                                    <p type="text"  class="form-control">{{forms.tempat}}</p>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Tanggal Lahir</label>
                                                <div class="col-sm-8">                                            
                                                    <p type="date"  class="form-control">{{forms.tgl_lahir}}</p>
                                                </div>
                                            </div>
                                            <div class="form-group row ">
                                                <label  class="col-sm-4 col-form-label">Alamat</label>
                                                <div class="col-sm-8">
                                                    <p type="text" class="form-control">{{forms.alamat}}</p>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Kelas</label>
                                                <div class="col-sm-8">
                                                    <div v-for="kelass in kelas" :key="kelass.id_kelas" :value="kelass.id_kelas" >
                                                        <p v-if="forms.kelas===kelass.id_kelas" style="text-transform: uppercase;" class="form-control">{{kelass.kelas}} {{kelass.jurusan}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                        
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"  @click="detailModal=false" data-dismiss="modal">Close</button>
                                    <!-- <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="detailModal=false">Submit</button> -->
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end modal detail -->
                    <!-- modal edit -->
                    <div v-if="editModal" class="modal fade" id="editModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">Edit Siswa</h5>
                                    <button type="button"  @click="editModal=false" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                 <form >
                                <div class="modal-body" v-for="edt in form" :key="edt.id_siswa">                          
                                    <div class="row">
                                        <div class="col-md-6" >
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">NISN</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="edt.nisn" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">NIK</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="edt.nik" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Nama</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="edt.nama" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Jenis Kelamin</label>
                                                <div class="col-sm-8">
                                                    <select type="text" v-model="edt.jenis_kelamin" class="form-control">
                                                        <option value="L">Laki-Laki</option>
                                                        <option value="P">Perempuan</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">No HP</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="edt.no_hp" class="form-control">
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Tempat</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="edt.tempat" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Tanggal Lahir</label>
                                                <div class="col-sm-8">                                            
                                                    <input type="date" v-model="edt.tgl_lahir" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group row mb-4">
                                                <label  class="col-sm-4 col-form-label">Alamat</label>
                                                <div class="col-sm-8">
                                                    <textarea type="text" v-model="edt.alamat" class="form-control"></textarea>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-4 col-form-label">Kelas</label>
                                                <div class="col-sm-8">
                                                    <select type="text" v-model="edt.kelas" class="form-control">
                                                        <option v-for="kelass in kelas" :key="kelass.id_kelas" :value="kelass.id_kelas" style="text-transform: uppercase;">{{kelass.kelas}} {{kelass.jurusan}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                        
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"   @click="editModal=false" data-dismiss="modal">Cancel</button>
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
    name:'Siswa',
    data() {
        return{
            siswa:[],
            search:'',
            del:[],
            edt:{},
            slice:[],
            form:{
                id_siswa: '',
                nisn: '',
                nik : '',
                nama : '',                
                jenis_kelamin : '',                
                no_hp:'',
                tempat:'',
                tgl_lahir:'',
                alamat:'',
                kelas : '',
            },
            kelas:[],
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
    },
    computed:{
        filter(){
            return this.siswa.filter((siswas)=>{
                return siswas.nama.includes(this.search)                
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
            .get("http://localhost/api/siswa")
            .then((response) => {
            this.siswa = response.data.data;
            console.log(response.data.message);            
            });
    },
    getKelas(){
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
            url: 'http://localhost/api/siswa/',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:params,
        })
        .then((res)=> {
            console.log(res.data.message)            
            this.siswa.splice(slice, 1)
            this.showAll()            
            this.alertDel=true
        })
    },
    getData(id,kelas){
        axios.get("http://localhost/api/siswa/",{params:{id:id,kelas:kelas}})
        .then((res) => {
            this.del = res.data.data
            this.form = res.data.data
            console.log(res.data.message)            
        })
    },
    AddData(){        
        axios
        .post("http://localhost/api/siswa", this.form)
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
        
        const id_siswa = this.form[0].id_siswa
        const nisn = this.form[0].nisn
        const nik = this.form[0].nik
        const nama = this.form[0].nama
        const jenis_kelamin = this.form[0].jenis_kelamin
        const no_hp = this.form[0].no_hp
        const tempat = this.form[0].tempat
        const tgl_lahir = this.form[0].tgl_lahir        
        const alamat = this.form[0].alamat
        const kelas = this.form[0].kelas
        const params = new URLSearchParams();
        params.append('id_siswa', id_siswa);
        params.append('nisn',nisn);
        params.append('nik',nik);
        params.append('nama',nama);
        params.append('jenis_kelamin',jenis_kelamin);
        params.append('no_hp',no_hp);
        params.append('tempat',tempat);
        params.append('tgl_lahir',tgl_lahir);
        params.append('alamat',alamat);
        params.append('kelas',kelas);

        axios({
            method: 'put',
            url: 'http://localhost/api/siswa/',
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
.siswa{
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
.search{
    margin-top:15px;
    margin-left:20px;
}
</style>