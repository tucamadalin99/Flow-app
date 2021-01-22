<template>
  <q-page class="flex flex-center">
    <img alt="Flow logo" src="~assets/logo.png" />
    <particles-bg color="#2d6cb5" num=80 type="cobweb" :canvas="{backgroundColor:'#fffff'}" :bg="true"/>
  </q-page>
</template>

<script>
import {ParticlesBg} from 'particles-bg-vue'
export default {
  name: "PageIndex",
  components: {ParticlesBg}
};
</script>
<style scoped>
</style>
