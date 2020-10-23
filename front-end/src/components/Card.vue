<template>
<div class="card-container">
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section>
        <div class="text-h6">{{name}}</div>
        <div class="text-subtitle2">{{position}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none info">
          <div class="photo">
               <q-avatar rounded size="100px">
      <img src="https://cdn.quasar.dev/img/avatar.png">
    </q-avatar>
          </div>
      </q-card-section>

      <q-card-section class="q-pt-none info">
        Phone: {{phone}}
      </q-card-section>

      <q-card-section class="q-pt-none info">
        Mail: {{mail}}
      </q-card-section>
    </q-card>
</div>
    
</template>
<script>
export default {
    props:['name', 'position', 'phone', 'mail']
}
</script>
<style scoped>
.q-card{
    
    width:250px;
}

.text-h6{
    text-align: center;
}
.text-subtitle2{
    text-align: center;
}
.info{
    text-align: center;
}
</style>