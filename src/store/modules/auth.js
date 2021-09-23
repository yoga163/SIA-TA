//store/modules/auth.js

import axios from 'axios';

const state = {
      user: '',
      level:'',
      id:'',
      idS:'',
      idG:'',
};
const getters = {
    isAuthenticated: state => !!state.user,
    StateUser: state => state.user,
    
};
const actions = {
  async LogIn({commit}, data) {
    await axios.post('http://localhost/api/login', data)
    .then(res => {
      commit('setUser', res.data.data[0]);      
      commit('setLevel', res.data.data[0].role);
      commit('setId', res.data.data[0].id_user);      
      commit('setIdS', res.data.data[0].id_siswa);
      commit('setIdG', res.data.data[0].id_guru);
    })
    
  },
  async LogOut({commit}){
    let user = ''
    commit('LogOut', user)
  }
              
};
const mutations = {
    setUser(state, user){
        state.user = user
  },
    setId(state, id){
      // console.log(state.id)
      state.id = id
      localStorage.setItem('id',state.id)
  },
  setIdS(state, idS){
    // console.log(state.id)
    state.idS = idS
    localStorage.setItem('idS',state.idS)
  },
  setIdG(state, idG){
    // console.log(state.id)
    state.idG = idG
    localStorage.setItem('idG',state.idG)
  },
    setLevel(state,level){
      // console.log(state.level)
      state.level = level[0]
      localStorage.setItem('level',state.level)
    },
    LogOut(state){
      state.user = ''
      state.level = ''
      state.id = ''
      localStorage.setItem('authenticated',false)
      localStorage.setItem('level','0')
      localStorage.setItem('id','0')
    },
};
export default {
  namespaced:true,
  state,
  getters,
  actions,
  mutations
};
