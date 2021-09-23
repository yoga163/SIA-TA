<template>
  <div class="sidebar">
    <h1>
      <span
        ><img
          src="../assets/icon.png"
          style="width:70px;height:70px;margin-left:15px;border-radius:50%;"
      /></span>
    </h1>
    <div v-if="level == 1">
      <span
        style="margin-left:20px;font-size:20px;text-transform: capitalize;"
        >{{ user.u_name }}</span
      ><br />
    </div>
    <div v-if="level == 2" style="margin-left:20px;">
      <span style="font-size:18px;text-transform: capitalize;">{{
        user.nama
      }}</span
      ><br />
      <span style="font-size:18px">{{ user.nisn }}</span>
    </div>
    <div v-if="level == 3" style="margin-left:20px;">
      <span style="font-size:18px;text-transform: capitalize;">{{
        user.nama_g
      }}</span
      ><br />
      <span style="font-size:14px">{{ user.nip }}</span>
    </div>

    <hr />
    <div class="menu" v-if="level == 1">
      <router-link active-class="active" tag="li" to="/home"
        ><i class="fas fa-home icon" /> Home</router-link
      >
      <router-link active-class="active" tag="li" to="/user"
        ><i class="fas fa-user icon" /> User</router-link
      >
      <router-link active-class="active" tag="li" to="/siswa"
        ><i class="fas fa-user icon" /> Siswa</router-link
      >
      <router-link active-class="active" tag="li" to="/guru"
        ><i class="fas fa-user icon" /> Guru</router-link
      >
      <router-link active-class="active" tag="li" to="/kelas"
        ><i class="fas fa-user icon" /> Kelas</router-link
      >
      <router-link active-class="active" tag="li" to="/mapel"
        ><i class="fas fa-user icon" /> Mapel</router-link
      >
      <router-link active-class="active" tag="li" to="/akademik"
        ><i class="fas fa-user icon" /> Tahun Akademik</router-link
      >
      <router-link active-class="active" tag="li" to="/setting"
        ><i class="fas fa-cog icon" /> Setting</router-link
      >
    </div>
    <div class="menu" v-if="level == 2">
      <router-link active-class="active" tag="li" to="/home"
        ><i class="fas fa-home icon" /> Home</router-link
      >
      <router-link active-class="active" tag="li" to="/profile-s"
        ><i class="fas fa-user icon" /> Profile</router-link
      >
      <router-link active-class="active" tag="li" to="/nilai"
        ><i class="fas fa-edit icon" /> Nilai</router-link
      >
      <router-link active-class="active" tag="li" to="/setting"
        ><i class="fas fa-cog icon" /> Setting</router-link
      >
    </div>
    <div class="menu" v-if="level == 3">
      <router-link active-class="active" tag="li" to="/home"
        ><i class="fas fa-home icon" /> Home</router-link
      >
      <router-link active-class="active" tag="li" to="/profile-g"
        ><i class="fas fa-user icon" /> Profile</router-link
      >
      <router-link active-class="active" tag="li" to="/nilai-g"
        ><i class="fas fa-edit icon" /> Nilai</router-link
      >
      <router-link active-class="active" tag="li" to="/setting"
        ><i class="fas fa-cog icon" /> Setting</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Sidebar",
  data() {
    return {
      level: localStorage.getItem("level"),
      guru: [],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
};
</script>
<style>
.sidebar {
  width: 200px;
  height: 100%;
  background-color: rgb(24, 177, 201);
  padding-top: 30px;
  position: fixed;
  z-index: 999;
  color: white;
}

.menu > li {
  list-style: none;
  width: 180px;
  height: 40px;
  display: flex;
  justify-content: left;
  align-items: center;
  cursor: pointer;
  margin-bottom: 5px;
  margin-left: 10px;
}
li > i {
  margin-right: 8px;
  margin-left: 20px;
}

.menu > li:hover {
  background-color: rgb(74, 207, 228);
  border-radius: 5px;
}

.active {
  background-color: rgb(20, 146, 165);
  border-radius: 5px;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
