<template>
    <div>
        <div class="container nilai">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title d-flex justify-content-center mt-3 mb-2">Input Laporan Hasil Akhir Semester</h5>
                            <div>
                                <p>Nama : {{user.nama_g}}</p>
                                <p>NIP : {{user.nip}}</p>
                               
                                <div class="row mb-2">
                                    <label  class="col-sm-1 col-form-label" style="padding-right:0px !important;">Kelas :</label>
                                    <div class="col-sm-2" style="padding-left:0px !important;">
                                        <select v-model="nilai.kelas_n" type="number" class="form-control ">
                                            <option v-for="kelass in kelas" :key="kelass.id_kelas" :value="kelass.id_kelas"  >{{kelass.kelas}} {{kelass.jurusan}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-6">
                                        <div class="form-group row">
                                            <label  class="col-sm-2 col-form-label" style="padding-right:0px !important;">Mapel :</label>
                                            <div class="col-sm-6" style="padding-left:0px !important;">
                                                <select v-model="nilai.mapel" type="number" class="form-control">
                                                    <option v-for="mapels in mapel" :key="mapels.id_mapel" :value="mapels.id_mapel" >{{mapels.mapel}}</option>
                                                    <!-- <option v-if="form.mapel1==mapel.id_mapel" :value="form.mapel1">{{mapel[0].mapel}}</option> -->
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="row">
                                            <label  class="col-sm-4 col-form-label" style="padding-right:0px !important;">Tahun Akademik :</label>
                                            <div class="col-sm-5" style="padding-left:0px !important;" >
                                                <select v-model="nilai.akademik" type="number" class="form-control ">
                                                    <option v-for="ak in akademik" :key="ak.id_ak" :value="ak.id_ak">{{ak.semester}} {{ak.thn_akademik}}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>                                
                                </div>
                                <button class="btn btn-primary plus" data-toggle="modal" data-target="#addModal" @click="addModal=true,getKelas(),getMapel(),getTahun(),getSiswa()"><i class="fas fa-plus"> Input Nilai</i></button>
                                <button class="btn btn-info plus" @click="show=true,getNilai(id=null,nilai.mapel_n,nilai.kelas_n,nilai.akademik,nama_siswa=null)"><i class="fas fa-search"> Cek Nilai</i></button>
                                
                                <div v-if="alertPlus" class="alert alert-success alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data Berhasil Ditambah!</strong>
                                <button type="button" class="close" data-dismiss="alert" @click="alertPlus=false" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                                <div v-if="alertPlus1" class="alert alert-danger alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                    <strong>Data tidak Berhasil Ditambah!</strong>
                                    <button type="button" class="close" data-dismiss="alert"  @click="alertPlus1=false" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <table v-if="show" class="table table-striped mt-4">
                                    <tr>
                                        <th>Nama Siswa</th>
                                        <th>Tugas 1</th>
                                        <th>Tugas 2</th>
                                        <th>Ulangan Harian 1</th>
                                        <th>Ulangan Harian 2</th>
                                        <th>UTS</th>
                                        <th>UAS</th>
                                        <th>Aksi</th>
                                    </tr>     
                                    <tr v-for="forms in form" :key="forms.id_nilai">
                                        <td style="text-transform: uppercase;font-size:14px">
                                            <div v-for="siswas in siswa" :key="siswas.id_siswa" :value="siswas.id_siswa" >
                                                <p v-if="forms.nama_siswa===siswas.id_siswa" >{{siswas.nama}}</p>
                                            </div>
                                        </td>
                                        <td style="text-transform: uppercase;" align="center">
                                            <input v-model="forms.tugas1" class="form-control w-50" disabled/>
                                        </td>
                                        <td style="text-transform: uppercase;" align="center">
                                            <input v-model="forms.tugas2" class="form-control w-50" disabled/>
                                        </td>
                                        <td style="text-transform: uppercase;" align="center">
                                            <input v-model="forms.harian1" class="form-control w-50" disabled/>
                                        </td>
                                        <td style="text-transform: uppercase;" align="center">
                                            <input v-model="forms.harian2" class="form-control w-50" disabled/>
                                        </td>
                                        <td style="text-transform: uppercase;" align="center">
                                            <input v-model="forms.uts" class="form-control w-50" disabled/>
                                        </td>
                                        <td style="text-transform: uppercase;" align="center">
                                            <input v-model="forms.uas" class="form-control w-50" disabled/>
                                        </td>
                                        <td>
                                            <a class="btn btn-warning" data-toggle="modal" data-target="#editModal" @click="editModal=true,getData(forms.id_nilai,mapel=null,kelas_n=null,akademik=null),getKelas(),getMapel(),getTahun(),getSiswa()"><i class="fas fa-edit" style="color:white;"></i></a>
                                        </td>
                                    </tr>        
                                </table>
                            </div>
                            <!-- modal tambah-->
                             <div v-if="addModal" class="modal fade" id="addModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="staticBackdropLabel">Tambah Mata Pelajaran</h5>
                                            <button type="button"  @click="addModal=false" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <form >
                                        <div class="modal-body">
                                             <div class="row mb-2">
                                                <label  class="col-sm-1 col-form-label" style="padding-right:0px !important;">Kelas :</label>
                                                <div class="col-sm-2" style="padding-left:0px !important;">
                                                    <select v-model="nilai2.kelas_n" type="number" class="form-control ">
                                                        <option v-for="kelass in kelas" :key="kelass.id_kelas" :value="kelass.id_kelas" @click="getData(id=0,kelass.id_kelas)" >{{kelass.kelas}} {{kelass.jurusan}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <label  class="col-sm-2 col-form-label" style="padding-right:0px !important;">Mapel :</label>
                                                        <div class="col-sm-6" style="padding-left:0px !important;">
                                                            <select v-model="nilai2.mapel" type="number" class="form-control">
                                                                <option v-for="mapels in mapel" :key="mapels.id_mapel" :value="mapels.id_mapel">{{mapels.mapel}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="row">
                                                        <label  class="col-sm-4 col-form-label" style="padding-right:0px !important;">Tahun Akademik :</label>
                                                        <div class="col-sm-5" style="padding-left:0px !important;" >
                                                            <select v-model="nilai2.akademik" type="number" class="form-control ">
                                                                <option v-for="ak in akademik" :key="ak.id_ak" :value="ak.id_ak">{{ak.semester}} {{ak.thn_akademik}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <table class="table table-striped mt-4">
                                                <tr>
                                                    <th>Nama Siswa</th>
                                                    <th>Tugas 1</th>
                                                    <th>Tugas 2</th>
                                                    <th>Ulangan Harian 1</th>
                                                    <th>Ulangan Harian 2</th>
                                                    <th>UTS</th>
                                                    <th>UAS</th>                                    
                                                </tr>     
                                                <tr v-for="forms,i in form2" :key="i">
                                                    <td style="text-transform: uppercase;font-size:14px">                                                        
                                                        <span>{{forms.nama}}</span>
                                                    </td>
                                                    <td style="text-transform: uppercase;" align="center">
                                                        <input v-model="forms.tugas1" class="form-control w-50"/>
                                                    </td>
                                                    <td style="text-transform: uppercase;" align="center">
                                                        <input v-model="forms.tugas2" class="form-control w-50"/>
                                                    </td>
                                                    <td style="text-transform: uppercase;" align="center">
                                                        <input v-model="forms.harian1" class="form-control w-50"/>
                                                    </td>
                                                    <td style="text-transform: uppercase;" align="center">
                                                        <input v-model="forms.harian2" class="form-control w-50"/>
                                                    </td>
                                                    <td style="text-transform: uppercase;" align="center">
                                                        <input v-model="forms.uts" class="form-control w-50"/>
                                                    </td>
                                                    <td style="text-transform: uppercase;" align="center">
                                                        <input v-model="forms.uas" class="form-control w-50"/>
                                                    </td>
                                                </tr>        
                                            </table>                                    
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"  @click="addModal=false" data-dismiss="modal">Cancel</button>
                                            <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="addModal=false,AddData()">Submit</button>
                                        </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <!-- end modal tambah -->
                            <!-- modal tambah-->
                             <div v-if="editModal" class="modal fade" id="editModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content" v-for="edt in form2" :key="edt.id_nilai">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="staticBackdropLabel">Tambah Mata Pelajaran</h5>
                                            <button type="button"  @click="editModal=false" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <form >
                                        <div class="modal-body">
                                             <div class="row mb-2">
                                                <label  class="col-sm-1 col-form-label" style="padding-right:0px !important;">Kelas :</label>
                                                <div class="col-sm-2" style="padding-left:0px !important;">
                                                    <select v-model="edt.kelas_n" type="number" class="form-control " disabled>
                                                        <option v-for="kelass in kelas" :key="kelass.id_kelas" :value="kelass.id_kelas" >{{kelass.kelas}} {{kelass.jurusan}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <label  class="col-sm-2 col-form-label" style="padding-right:0px !important;">Mapel :</label>
                                                        <div class="col-sm-6" style="padding-left:0px !important;">
                                                            <select v-model="edt.mapel_n" type="number" class="form-control" disabled>
                                                                <option v-for="mapels in mapel" :key="mapels.id_mapel" :value="mapels.id_mapel">{{mapels.mapel}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="row">
                                                        <label  class="col-sm-4 col-form-label" style="padding-right:0px !important;">Tahun Akademik :</label>
                                                        <div class="col-sm-5" style="padding-left:0px !important;" >
                                                            <select v-model="edt.akademik" type="number" class="form-control " disabled>
                                                                <option v-for="ak in akademik" :key="ak.id_ak" :value="ak.id_ak">{{ak.semester}} {{ak.thn_akademik}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <table class="table table-striped mt-4">
                                                <tr>
                                                    <th>Nama Siswa</th>
                                                    <th>Tugas 1</th>
                                                    <th>Tugas 2</th>
                                                    <th>Ulangan Harian 1</th>
                                                    <th>Ulangan Harian 2</th>
                                                    <th>UTS</th>
                                                    <th>UAS</th>                                    
                                                </tr>     
                                                <tr >
                                                    <td style="text-transform: uppercase;font-size:14px">                                                        
                                                        <div v-for="siswas in siswa" :key="siswas.id_siswa">
                                                            <span v-if="edt.nama_siswa==siswas.id_siswa">{{siswas.nama}}</span>
                                                            
                                                        </div>
                                                    </td>
                                                    <td style="text-transform: uppercase;" align="center">
                                                        <input v-model="edt.tugas1" class="form-control w-50"/>
                                                    </td>
                                                    <td style="text-transform: uppercase;" align="center">
                                                        <input v-model="edt.tugas2" class="form-control w-50"/>
                                                    </td>
                                                    <td style="text-transform: uppercase;" align="center">
                                                        <input v-model="edt.harian1" class="form-control w-50"/>
                                                    </td>
                                                    <td style="text-transform: uppercase;" align="center">
                                                        <input v-model="edt.harian2" class="form-control w-50"/>
                                                    </td>
                                                    <td style="text-transform: uppercase;" align="center">
                                                        <input v-model="edt.uts" class="form-control w-50"/>
                                                    </td>
                                                    <td style="text-transform: uppercase;" align="center">
                                                        <input v-model="edt.uas" class="form-control w-50"/>
                                                    </td>
                                                </tr>        
                                            </table>                                    
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"  @click="editModal=false" data-dismiss="modal">Cancel</button>
                                            <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="editModal=false,editData()">Submit</button>
                                        </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <!-- end modal tambah -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'

export default {
    name:'NilaiG',    
    data() {
        return{
            akademik:[],
            kelas:[],
            nilai:{},
            nilai2:{},
            mapel:[],
            siswa:[],
            form:{},
            form2:{},
            edt:{},
            addModal:false,
            editModal:false,
            alertPlus:false,
            alertPlus1:false,
            show:false,
        }
    },
    computed:{
        ...mapState({
        user: state => state.auth.user
        })
    },
    created(){
        this.getTahun()
        this.getKelas()
        this.getMapel()
        this.getSiswa()
    },
    methods:{
        getTahun(){
            axios
            .get("http://localhost/api/akademik")
            .then((response) => {
            this.akademik = response.data.data;
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
    getMapel(){
            axios
            .get("http://localhost/api/mapel")
            .then((response) => {
            this.mapel = response.data.data;
            console.log(response.data.message);            
            });
        },
    getSiswa(){
            axios
            .get("http://localhost/api/siswa")
            .then((response) => {
            this.siswa = response.data.data;
            console.log(response.data.message);
            });
        },
    getData(id,mapel_n,kelas_n,akademik){
            axios
            .get("http://localhost/api/nilai/",{params:{id:id,mapel_n:mapel_n,kelas_n:kelas_n,akademik:akademik}})
            .then((res) => {
            this.edt = res.data.data
            this.form2 = res.data.data
            console.log(res.data.message)
            console.log(id)
        })

        },
    AddData(){
        this.nilai.nilai_n = this.form2
        axios
        .post("http://localhost/api/nilai", this.nilai)
        .then((response) => {
            console.log(response.data.message);
            console.log(this.nilai);
            this.alertPlus=true
            
        })
        .catch((error)=>{
            console.log(error)
            this.alertPlus1=true
        })
    },
    getNilai(id,mapel,kelas_n,akademik,nama_siswa){
        axios
            .get("http://localhost/api/nilai/",{params:{id:id,mapel:mapel,kelas_n:kelas_n,akademik:akademik,nama_siswa:nama_siswa}})
            .then((res) => {
            
            this.form = res.data.data
            console.log(res.data.message)
            // console.log(id)
        })
    },
    editData(){        
        const id_nilai = this.form2[0].id_nilai
        const mapel = this.form2[0].mapel
        const kelas_n = this.form2[0].kelas_n
        const akademik = this.form2[0].akademik    
        const nama_siswa = this.form2[0].nama_siswa
        const harian1 = this.form2[0].harian1
        const harian2 = this.form2[0].harian2
        const tugas1 = this.form2[0].tugas1        
        const tugas2 = this.form2[0].tugas2
        const uts = this.form2[0].uts
        const uas = this.form2[0].uas
        const data = new URLSearchParams();
        data.append('id_nilai', id_nilai);
        data.append('mapel',mapel);
        data.append('kelas_n',kelas_n);
        data.append('akademik',akademik);        
        data.append('nama_siswa',nama_siswa);
        data.append('harian1',harian1);
        data.append('harian2',harian2);
        data.append('tugas1',tugas1);
        data.append('tugas2',tugas2);
        data.append('uts',uts);
        data.append('uas',uas);
        // console.log(nama_siswa)
        axios({
            method: 'put',
            url: 'http://localhost/api/nilai/',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:data,
        })
        .then((res)=>{
            console.log(res.data.message)
            this.getNilai
            this.alertEdt = true
        })
    }
    },
}
</script>
<style>
.nilai{
    margin-left:200px !important;
    padding-top: 30px;
}
</style>