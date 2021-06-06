import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios"
import VueAxios from "vue-axios"
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const PORT = 444 || 2222
const mode = 'dev' // can be 'product'

let url = mode == 'dev' ? `http://localhost:${PORT}/api/` : ''
Vue.axios.defaults.baseURL = url

export default new Vuex.Store({
  state: {
    txs:[],
    currencies:[],
    categories:[]
  },
  mutations: {
    SET_TXS(state,txs){
      state.txs = txs
    },
    SET_CATS(state,cats){
      state.categories = cats
    },
    SET_CUR(state,cur){
      state.currencies = cur
    }
  },
  actions: {
    DELETE_QUERY:({dispatch},[params,get])=>{
      let options = {
        url: params.params_query != '' ? url + params.url + params.params_query : url + params.url,
        method: params.method,
        data: params.data != {} ? params.data : '',
        headers: params.headers
      }

      let toGet = {
        url: get.params_query != '' ? url + get.url + get.params_query : url + get.url,
        method: get.method,
        data: get.data != {} ? get.data : '',
        headers: get.headers
      }

      axios(options)
      .then(res=>{
        console.log(res.data)
        dispatch('NEW_QUERY', toGet)
      })
      .catch(e=>console.error(e))
    },
    NEW_QUERY:({commit},params)=>{
      let options = {
        url: params.params_query != '' ? url + params.url + params.params_query : url + params.url,
        method: params.method,
        data: params.data != {} ? params.data : '',
        headers: params.headers
      }

      axios(options)
      .then(res=>commit(params.state, res.data))
      .catch(e=>console.error(e))
    }
  },
  modules: {
  },
  plugins: ([createPersistedState()])
});
