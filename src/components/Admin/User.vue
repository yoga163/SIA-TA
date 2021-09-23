<template>
    <div>
        <div class="container user">
            <div class="row">
                <div class="col-lg-9 col-md-12">
                    <div class="card edt">                        
                            <h3 class="card-title jdl">Daftar User</h3>
                            <button class="btn btn-primary plus" data-toggle="modal" data-target="#addModal" @click="addModal=true,getRole()"><i class="fas fa-plus"> Tambah</i></button>
                            <form class="form-inline search">
                                <input class="form-control" v-model="search" placeholder="Search" aria-label="Search">                                
                            </form>
                            <!-- alert -->
                            <div v-if="alertPlus" class="alert alert-success alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data Berhasil Ditambah!</strong>
                                <button type="button" @click="alertPlus=false" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div v-if="alertPlus1" class="alert alert-danger alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data tidak Berhasil Ditambah!</strong>
                                <button type="button" @click="alertPlus1=false" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div v-if="alertDel" class="alert alert-success alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data Berhasil Dihapus!</strong>
                                <button type="button" @click="alertDel=false" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div v-if="alertEdt" class="alert alert-success alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                <strong>Data Berhasil Diupdate!</strong>
                                <button type="button" @click="alertEdt=false" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <!-- end alert -->
                        <div class="card-body bd">
                            <table class="table table-striped">
                                <tr>
                                    <th>No</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Role</th>
                                    <th>Aksi</th>
                                </tr>     
                                <tr v-for="users, i in pageOfItems" :key="i">
                                    <td style="text-align:center;">{{++i}}</td>
                                    <td style="text-align:center;">{{users.username}}</td>
                                    <td style="text-align:center;" class="hidetext">{{users.password}}</td>                                   
                                    <td style="text-align:center;text-transform:capitalize;">{{users.role}}</td>
                                    <td style="text-align:center;">                                        
                                        <a class="btn btn-warning" data-toggle="modal" data-target="#editModal" @click="editModal=true,getRole(),getData(users.id_user)"><i class="fas fa-edit" style="color:white;"></i></a>
                                        <a class="btn btn-danger" data-toggle="modal" data-target="#modalDel" @click="deleteModal=true,getData(users.id_user),slice=i"><i class="fas fa-trash"></i></a>
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
                            <div class="modal-footer" v-for="dels in del" :key="dels.id_kelas">
                                <button type="button" class="btn btn-secondary"  @click="deleteModal=false" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteModal=false,hapus(dels.id_user,slice)">Hapus</button>
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
                                    <h5 class="modal-title" id="staticBackdropLabel">Tambah User</h5>
                                    <button type="button"  @click="addModal=false" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form >
                                <div class="modal-body">                                                                    
                                    <label>Username</label>
                                    <input type="text" v-model="form.username" class="form-control">
                                    <label>Password</label>
                                    <input :type="type" v-model="form.password" class="form-control" readonly>
                                    <input type="checkbox" @click="showPassword"><label style="font-size:13px;"> Show Password</label><br>
                                    <label>Role</label>
                                    <select v-model="form.role" type="number" class="form-control" style="text-transform:uppercase;">
                                        <option v-for="roles in role" :key="roles.id_role" :value="roles.id_role" >{{roles.role}}</option>
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
                                    <h5 class="modal-title" id="staticBackdropLabel">Edit User</h5>
                                    <button type="button"  @click="editModal=false,showPassword()" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form >
                                <div class="modal-body" v-for="edt in form" :key="edt.id_user">
                                                                    
                                    <label>Username</label>
                                    <input type="text" v-model="edt.username" class="form-control">
                                    <label>Password</label>
                                    <input :type="type" v-model="edt.password" :value="defPass" class="form-control" readonly>
                                    <div class="row mt-1 ml-1 mb-2">
                                        <input class="col-sm-1 " type="checkbox" @click="showPassword"><span style="font-size:13px;"> Show Password</span>
                                        <input class="col-sm-1 " type="checkbox" @click="defPass"><span style="font-size:13px;"> Default Password</span><br>
                                    </div>
                                    <label>Role</label>
                                    <select v-model="edt.role" type="number" class="form-control" style="text-transform:uppercase;">
                                        <option v-for="roles in role" :key="roles.id_role" :value="roles.id_role" >{{roles.role}}</option>
                                    </select> 
                                                                
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"  @click="editModal=false,showPassword()" data-dismiss="modal">Cancel</button>
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
    name:'User',
    data() {
        return{
            user:[],
            search:'',
            type: 'password',
            defPassw:'123456',
            del:[],
            edt:{},
            slice:[],
            form:{
                id_user: '',
                username: '',
                password : '123456',
                role:'',
            },
            role:[],
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
    computed:{
        filter(){
            return this.user.filter((users)=>{
                return users.username.match(this.search)
            })
        }
    },
    methods:{
        onChangePage(pageOfItems) {
        // update page of items
        this.pageOfItems = pageOfItems;
        },
        defPass(){
            if(this.form[0].password) {
                this.form[0].password = this.defPassw
            } else {
                this.form[0].password
            }
        },
        showPassword() {
            if(this.type === 'password') {
                this.type = 'text'
            } else {
                this.type = 'password'          
            }
        },
        getRole() {
            axios
                .get("http://localhost/api/role")
                .then((response) => {
                this.role = response.data.data;
                console.log(response.data.message);            
                });
        },
        showAll() {
            axios
                .get("http://localhost/api/user")
                .then((response) => {
                this.user = response.data.data;
                console.log(response.data.message);            
                });
        },
        hapus(id,slice){  
        const params = new URLSearchParams();
        params.append('id', id);
        axios({
            method: 'delete',
            url: 'http://localhost/api/user/',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:params,
        })
        .then((res)=> {
            console.log(res.data.message)            
            this.user.splice(slice, 1)
            this.showAll()            
            this.alertDel=true
        })
    },
    getData(id){
        axios.get("http://localhost/api/user/",{params:{id:id}})
        .then((res) => {
            this.del = res.data.data
            this.form = res.data.data
            console.log(res.data.message)  
        })
    },
    AddData(){
        
        axios
        .post("http://localhost/api/user", this.form)
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
        
        const id_user = this.form[0].id_user
        const username = this.form[0].username
        const password = this.form[0].password
        const role = this.form[0].role
        
        const params = new URLSearchParams();
        params.append('id_user', id_user);
        params.append('username',username);
        params.append('password',password);
        params.append('role',role);
        
        axios({
            method: 'put',
            url: 'http://localhost/api/user/',
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
.hidetext { 
    -webkit-text-security: disc;
    }
.user{
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