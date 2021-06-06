<template>
  <div id="currencies">
      <div class="ec-page-header">
          <h1>Currencies</h1>
      </div>
      <div class="ec-page-content">
          <table>
              <thead>
                  <th>#</th>
              <th>ISO Code</th>
              <th>ISO Name</th>
              <th>Title</th>
              <th>Actions</th>
              </thead>
              <tbody>
                  <tr>
                      <th></th>
                      <td>
                          <input-regular class="form-controller-fit" :isLabel="false" :placeholder="'Enter ISO Numberic Code (443)'" v-model="form.ISO.code" :type="'number'" />
                      </td>
                      <td>
                          <input-regular class="form-controller-fit" :isLabel="false" :placeholder="'Enter ISO Title (usd))'" v-model="form.ISO.name" :type="'text'" />
                      </td>
                      <td>
                          <input-regular class="form-controller-fit" :isLabel="false" :placeholder="'Enter Title'" v-model="form.title" :type="'text'" />
                      </td>
                      <td>
                          <button-regular :btnClass="'btn-regular'" @click="saveItems()">Save</button-regular>
                      </td>
                  </tr>
                  <tr v-for="(i,index) in currencies" :key="index">
                      <th>{{index}}</th>
                      <td>{{i.ISO.code}}</td>
                      <td>{{i.ISO.name}}</td>
                      <td>{{i.title}}</td>
                      <td>
                        <button-regular @click="deleteItem(i._id)" :btnClass="'btn-danger-o'">Delete</button-regular>

                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ButtonRegular from '../components/ui/buttons/button-regular.vue'
import inputRegular from '../components/ui/forms/input/input-regular.vue'
export default {
  components: { inputRegular, ButtonRegular },
    data(){
        return{
            form:{
                ISO:{
                    code:Number,
                    name:String
                },
                title:String
            }
        }
    },
    computed:{
        ...mapState(["currencies"])
    },
    methods:{
        saveItems(){
            let params = {
                url: 'currencies',
                method:'post',
                data: this.form
            }

            this.$http(params)
            .then((res)=>{
                console.log(res.data)
                this.getItems()
            })
            .catch(err=>console.log(err))
        },
        getItems(){
             let params = {
                url: 'currencies',
                method:'get',
                data: {},
                state: 'SET_CUR',
                params_query: ''
            }

            this.$store.dispatch('NEW_QUERY',params)
        },
        deleteItem(id){
            let params = {
                url: `currencies/delete/${id}`,
                method:'delete',
            }

            this.$http(params)
            .then(()=>{
                this.getItems()
            })
        }
    },

}
</script>

<style>

</style>