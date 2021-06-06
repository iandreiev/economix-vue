<template>
  <div id="categories">
    <div class="ec-page-header">
        <h1>Categories</h1>
    </div>
    <div class="ec-page-content">
        <table class="table">
            <thead>
                <th>#</th>
                <th>Title</th>
                <th>Alias</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <tr>
                    <th></th>
                    <td>
                        <input-regular class="form-controller-fit" :isLabel="false" :placeholder="'Enter title'" v-model="form.title" :type="'text'" />
                    </td>
                    <td>
                        <input-regular class="form-controller-fit" :isLabel="false" :placeholder="'Enter alias'" v-model="form.alias" :type="'text'" />

                    </td>
                    <td>
                       <div class="btn-row">
                           <button-regular :btnClass="'btn-regular'" @click="saveItems()">Save</button-regular>
                       </div>
                    </td>
                </tr>
                <tr v-for="(i,index) in categories" :key="index">
                    <th>{{index}}</th>
                    <td>{{i.title}}</td>
                    <td>{{i.alias}}</td>
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
import {mapState} from "vuex"
import buttonRegular from '../components/ui/buttons/button-regular.vue';
import InputRegular from '../components/ui/forms/input/input-regular.vue';
export default {
  components: { buttonRegular, InputRegular },
    data(){
        return{
            form:{
                title:'',
                alias:''
            }
        }
    },
    computed:{
        ...mapState(["categories"])
    },
    methods:{
        clearForm(){
            console.log('click')
            this.form = {
                title:'',
                alias:''
            }
        },
        saveItems(){
            let params = {
                url: 'categories',
                method:'post',
                data: this.form,
                state: 'SET_CATS',
                params_query: ''
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
                url: 'categories',
                method:'get',
                data: {},
                state: 'SET_CATS',
                params_query: ''
            }

            this.$store.dispatch('NEW_QUERY',params)
        },
        deleteItem(id){
            let params = {
                url: `categories/delete/${id}`,
                method:'delete',
            }

            this.$http(params)
            .then(()=>{
                this.getItems()
            })
        }
    },
    mounted(){
        this.getItems()
    }
};
</script>

<style>
</style>