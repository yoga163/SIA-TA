//store/modules/auth.js

import axios from 'axios';

const state = {
        kelas: '',
      
};
const getters = {    
    StateUser: state => state.kelas,
    
};
const actions = {
  async LogIn({commit}, data) {
    await axios.post('http://localhost/api/kelas', data)
    .then(res => {
      commit('setUser', res.data.data[0]);
      commit('setLevel', res.data.data[0].role);   
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
    setLevel(state,level){      
      localStorage.setItem('level',level)
    },
    LogOut(state){
      state.user = ''
      localStorage.setItem('authenticated',false)
      localStorage.setItem('level','0')
    },
};
export default {
  namespaced:true,
  state,
  getters,
  actions,
  mutations
};
