<template>
    <div class="board-container">
        <div class="title">
        <h2><strong>BE-BC</strong></h2>
        </div>
        <card 
        :name="this.name"
        :position="this.position"
        :phone="this.phone"
        :mail="this.mail"
        >


        </card>

    </div>
</template>
<script>
import card from '../components/Card'
export default {
    name: "BoardPage",
    data(){
        return{
            name: 'Muie',
            position: 'Vicepresedinte Proiecte',
            phone: '0723319930',
            mail: 'vaginaInspector@gmail.com'
        }
        
    },
    components:{
        card
    }

}
</script>
<style scoped>
h2{
    text-align: center;
}

</style>