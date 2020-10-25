<template>
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #2d6cb5 0%, #1a154c 100%)"
    >
      <q-card-section>
        <div class="text-h6">{{name}}</div>
        <div class="text-subtitle2">{{position}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none info">
          <div class="q-pa-md q-gutter-sm">
               <q-avatar  size="100px">
      <img src="https://cdn.quasar.dev/img/avatar.png">
    </q-avatar>
          </div>
      </q-card-section>

      <q-card-section class="q-pt-none info">
       <div @click="copyPhone" class="text-subtitle1 phone-cont"> <q-icon name="phone" /> {{phone}} </div>
       <div @click="copyContent" class="text-subtitle2 mail-cont"> <q-icon name="mail" /> {{mail}} </div>
       </q-card-section>
    </q-card>    
</template>
<script>
import {copyToClipboard} from 'quasar'
export default {
    props:['name', 'position', 'phone', 'mail'],
        methods: {
        copyContent: function(){
            copyToClipboard(this.mail).then(res => this.$q.notify({
          color: "green-6",
          textColor: "white",
          icon: "assignment_turned_in",
          message: "Email copied to clipboard"
        })).catch(err => console.log(err))
        },
        copyPhone: function(){
             copyToClipboard(this.phone).then(res => this.$q.notify({
          color: "green-6",
          textColor: "white",
          icon: "assignment_turned_in",
          message: "Phone number copied to clipboard"
        })).catch(err => console.log(err))
        }
    }
}
</script>
<style scoped>
.q-card{
    width:250px;
    margin: 2.5%;
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
.phone-cont:hover{
    color:limegreen;
     
}
.phone-cont{
        -webkit-cursor: url("/public/icons/cursor_clipboard.png"), auto;
}

.mail-cont:hover{
    color:limegreen;
    cursor: -webkit-grab;
    cursor:grab
}


</style>