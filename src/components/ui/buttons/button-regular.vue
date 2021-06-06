<template>
  <button class="btn" :class="btnClass" @click="callback($event)">
    <slot></slot>
  </button>
</template>

<script>
export default {
    props: ["btnClass", "action"],
    methods:{
        callback(e){
            this.$emit('click',e)
        }
    }
}
</script>

<style>

</style>