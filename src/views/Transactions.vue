<template>
  <div id="transactions">
      <div class="ec-page-header">
          <h1>Transactions</h1>
      </div>
      <div class="ec-page-content">
          <table>
              <thead>
                <th>#</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Payload</th>
              <th>Created At</th>
              </thead>
              <tbody>
                  <tr>
                      <th></th>
                      <td>
                          <div class="row">
                          <input-regular class="form-controller-fit" :isLabel="false" :placeholder="'Amount'" v-model="form.amount" :type="'number'" />
                          <select v-model="form.currency" name="cur" id="cur">
                              <option selected>Default</option>
                              <option v-for="(i,index) in currencies" :key="index" :value="i.ISO.name">{{i.title}}</option>
                          </select>
                          </div>
                      </td>
                      <td>
                          <select v-model="form.category" name="cat" id="cat">
                              <option selected>Default</option>
                              <option v-for="(i,index) in categories" :key="index" :value="i.alias">{{i.title}}</option>
                          </select>
                      </td>
                      <td>
                          <input-regular class="form-controller-fit" :isLabel="false" :placeholder="'Payload'" v-model="form.payload" :type="'text'" />
                      </td>
                      <td>
                          <button-regular @click="saveItems()">Save</button-regular>
                      </td>
                  </tr>
                  <tr v-for="(i,index) in txs" :key="index">
                      <th>{{index}}</th>
                      <td>{{`${i.amount} ${i.currency}`}}</td>
                      <td>{{i.category}}</td>
                      <td>{{i.payload}}</td>
                      <td>{{moment(i.last_edit).format('LLL')}}</td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ButtonRegular from '../components/ui/buttons/button-regular.vue';
import inputRegular from '../components/ui/forms/input/input-regular.vue';
var moment = require('moment')

export default {
  components: { inputRegular, ButtonRegular },
  data(){
      return{
          form: {
              amount: Number,
              currency: String,
              category: String,
              payload: '',
              last_edit: ''
          },
          moment:moment
      }
  },
  computed:{
      ...mapState(["currencies","categories","txs"])
  },
  methods:{
      getItems(){
            let params = {
                url: 'txs',
                method:'get',
                data: {},
                state: 'SET_TXS',
                params_query: ''
            }

            this.$store.dispatch('NEW_QUERY',params)
      },
      saveItems(){
          this.form.last_edit = new Date().getTime()

         let params = {
                url: 'txs',
                method:'post',
                data: this.form
            }

            this.$http(params)
            .then((res)=>{
                console.log(res.data)
                this.getItems()
            })
            .catch(err=>console.log(err))
      }
  }
  };
</script>

<style>
</style>