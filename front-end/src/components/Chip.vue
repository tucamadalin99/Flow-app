<template>
  <div class="flex flex-center">
    <q-chip dense size="xl">
      <div class="info">
        <div class="text-caption" id="elName">{{ elementName }}</div>
        <div class="text-body2" id="elVal">{{ elementValue }}</div>
      </div>
    </q-chip>
  </div>
</template>

<script>
export default {
  props: ["elementName", "elementValue"]
};
</script>
<style scoped>
.q-chip {
  width: 200px;
  height: 50px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right bottom, #2d6cb5, rgb(64, 57, 139));
  color: white;
}
#elName {
  position: relative;
  width: 100%;
  margin-bottom: 0px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
#elVal {
  position: relative;
  width: 100%;
  margin-bottom: 0px;
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
}
.info {
  display: grid;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
