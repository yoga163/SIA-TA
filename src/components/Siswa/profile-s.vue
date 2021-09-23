<template>
  <div>
    <div class="container profile">
      <div class="row">
        <div class="col-lg-10 col-md-8">
          <div class="card edt">
            <h4 class="card-title jdl">Biodata Siswa</h4>
            <hr
              style="width:200px;items-align:left;margin-left:20px;margin-bottom:20px;border:1px solid"
            />
            <div
              v-show="alertEdt"
              class="alert alert-success alert-dismissible fade show"
              role="alert"
              style="margin-top:10px;"
            >
              <strong>Data Berhasil Diupdate!</strong>
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                @click="alertEdt = false"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="card-body bd">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">NISN</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        v-model="user.nisn"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">NIK</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        v-model="user.nik"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Nama</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        v-model="user.nama"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Jenis Kelamin</label>
                    <div class="col-sm-8">
                      <select
                        type="text"
                        v-model="user.jenis_kelamin"
                        class="form-control"
                      >
                        <option value="L">Laki-Laki</option>
                        <option Value="P">Perempuan</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">No HP</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        v-model="user.no_hp"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Tempat</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        v-model="user.tempat"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Tanggal Lahir</label>
                    <div class="col-sm-8">
                      <input
                        type="date"
                        v-model="user.tgl_lahir"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="form-group row mb-4">
                    <label class="col-sm-4 col-form-label">Alamat</label>
                    <div class="col-sm-8">
                      <textarea
                        type="text"
                        v-model="user.alamat"
                        class="form-control"
                      ></textarea>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Kelas</label>
                    <div class="col-sm-8">
                      <select
                        v-model="user.kelas"
                        type="number"
                        class="form-control"
                        disabled
                      >
                        <option
                          v-for="kelass in kelas"
                          :key="kelass.id_kelas"
                          :value="kelass.id_kelas"
                          >{{ kelass.kelas }} {{ kelass.jurusan }}</option
                        >
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class=" d-flex justify-content-end mt-2">
                <a
                  class="btn btn-primary"
                  @click="(alertEdt = true), editData()"
                  >Update</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "Profile-s",
  data() {
    return {
      siswa: [],
      kelas: [],
      alertEdt: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  created() {
    this.showAll();
  },
  methods: {
    showAll() {
      axios.get("http://localhost/api/kelas").then((response) => {
        this.kelas = response.data.data;
        console.log(response.data.message);
      });
    },
    editData() {
      const id_siswa = this.user.id_siswa;
      const nisn = this.user.nisn;
      const nik = this.user.nik;
      const nama = this.user.nama;
      const jenis_kelamin = this.user.jenis_kelamin;
      const no_hp = this.user.no_hp;
      const tempat = this.user.tempat;
      const tgl_lahir = this.user.tgl_lahir;
      const alamat = this.user.alamat;
      const kelas = this.user.kelas;
      const data = new URLSearchParams();
      data.append("id_siswa", id_siswa);
      data.append("nisn", nisn);
      data.append("nik", nik);
      data.append("nama", nama);
      data.append("jenis_kelamin", jenis_kelamin);
      data.append("no_hp", no_hp);
      data.append("tempat", tempat);
      data.append("tgl_lahir", tgl_lahir);
      data.append("alamat", alamat);
      data.append("kelas", kelas);
      axios({
        method: "put",
        url: "http://localhost/api/siswa/",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: data,
      }).then((res) => {
        console.log(res.data.message);
        this.showAll();
        this.alertEdt = true;
      });
    },
  },
};
</script>
<style>
.profile {
  margin-left: 220px !important;
  padding-top: 35px;
}

.edt {
  padding-right: 20px;
  padding-left: 40px;
}
.bd {
  padding-left: 20px;
}
.jdl {
  margin-left: 30px;
  margin-bottom: 0px !important;
}
table {
  width: 600px;
}
.plus {
  width: 170px;
  margin-left: 20px;
}
th {
  background-color: grey;
  color: white;
  padding-left: 10px;
  text-align: center;
  padding: 8px;
}
td {
  padding: 10px;
}
</style>
