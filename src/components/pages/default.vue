<template>
  <div id="default-page" class="ec-container">
    <div class="ec-sidebar">
        <router-link tag="div" :to="{name: i.route}" exact-active-class="ec-sidebar-item active" class="ec-sidebar-item" v-for="i in nav" :key="i.id">{{i.name}}</router-link>
    </div>
    <div class="ec-content">
        <router-view />
    </div>
  </div>
</template>

<script>
import nav from "../../store/nav"

export default {
    data(){
        return{
            nav
        }
    }
};
</script>

<style>
</style>