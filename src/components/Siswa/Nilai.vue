<template>
    <div>
        <div class="container nilai-s">
            <div class="row">
                <div class="col-sm-9">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title d-flex justify-content-center mt-3 mb-2">Laporan Hasil Akhir Semester</h5>
                            <div>
                                <p>Nama : {{user.nama}}</p>
                                <p>NISN : {{user.nisn}}</p>
                                <div class="form-group row">
                                    <label  class="col-sm-1 col-form-label" style="padding-right:0px !important;">Kelas :</label>
                                    <div class="col-sm-2" style="padding-left:0px !important;">
                                        <select v-model="user.kelas" type="number" class="form-control " disabled>
                                            <option v-for="kelass in kelas" :key="kelass.id_kelas" :value="kelass.id_kelas">{{kelass.kelas}} {{kelass.jurusan}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                                <select type="number" v-model="form.ak" class="form-control w-25 d-flex justify-content-center">
                                    <option v-for="ak in akademik" :key="ak.id_ak" :value="ak.id_ak"  @click="show=true,getData(id=null,mapel_n=null,kelas_n=null,ak.id_ak,user.id_siswa)">{{ak.semester}} {{ak.thn_akademik}}</option>
                                </select>

                            <table v-if="show" class="table table-striped mt-4">
                                <tr>
                                    <th>No</th>
                                    <th>Mata Pelajaran</th>
                                    <th>Nilai</th>
                                    <th>Predikat</th>
                                </tr>     
                                <tr v-for="forms2, i in form2" :key="forms2.id_nilai">
                                    <td align="center">{{++i}}</td>
                                    <td style="text-transform: uppercase;">                                        
                                        <div v-for="mapels in mapel" :key="mapels.id_mapel">
                                            <p v-if="forms2.mapel_n===mapels.id_mapel">{{mapels.mapel}}</p>
                                        </div>
                                    </td>
                                    <td style="text-transform: uppercase;" align="center">{{totalNilai}}</td>
                                    <td style="text-transform: uppercase;" align="center">
                                        <p v-if="totalNilai>90">A</p>
                                        <p v-if="totalNilai<90">B</p>
                                        <p v-if="totalNilai<75">C</p>
                                        <p v-if="totalNilai<65">D</p>                                        
                                    </td>
                                </tr>        
                            </table>
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
    name:'Nilai',
    data() {
        return{
            akademik:[],
            kelas:[],
            nilai:{},
            mapel:[],
            form2:{},
            form:{},
            show:false,
        }
    },
    computed:{
        ...mapState({
        user: state => state.auth.user
        }),
        totalNilai(){
            return this.form2.reduce(function(items,form2){
                var item = items+((((parseInt(form2.harian1)+parseInt(form2.harian2))/2)+((parseInt(form2.tugas1)+parseInt(form2.tugas2))/2)+(parseInt(form2.uts))+(parseInt(form2.uas)))/4)
                return parseFloat(item).toFixed(0);
            },0)
        }
    },
    created(){
        this.getTahun()
        this.getKelas()
        this.getMapel()
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
        getMapel(){
            axios
            .get("http://localhost/api/mapel")
            .then((response) => {
            this.mapel = response.data.data;
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
        getData(id,mapel_n,kelas_n,akademik,nama_siswa){
            axios
            .get("http://localhost/api/nilai/",{params:{id:id,mapel_n:mapel_n,kelas_n:kelas_n,akademik:akademik,nama_siswa:nama_siswa}})
            .then((res) => {
            this.edt = res.data.data
            this.form2 = res.data.data
            console.log(res.data.message)
            console.log(nama_siswa)
        })

        },
    },
}
</script>
<style>
.nilai-s{
    margin-left:220px !important;
    padding-top: 35px;
}
</style>
