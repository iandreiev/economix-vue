<template>
  <div class="form-controller">
    <label :for="name" v-if="isLabel == true">{{label}}</label>
    <textarea :name="name" :placeholder="placeholder" v-on:input="$emit('input', $event.target.value)"></textarea>  
  </div>
</template>

<script>
export default {
    name:'TextArea',
    props:{
        name: String,
        type: String,
        placeholder: String,
        isLabel: Boolean,
        label: String
    }
}
</script>

<style>

</style>