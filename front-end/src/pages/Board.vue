<template>
    <div class="board-container">
        <!-- <div class="title">
        <h2><strong>BE-BC</strong></h2>
        </div> -->
        <div class="row cards">
        <card
        v-for="item in items"
        :key="item.name"
        :name="item.name"
        :position="item.position"
        :phone="item.phone"
        :mail="item.mail"
        >
        </card>
        </div>

    </div>
</template>
<script>
import card from '../components/Card'
export default {
    name: "BoardPage",
    data(){
        return{
            items:[
                {
                name: 'Muie',
                position: 'Vicepresedinte Proiecte',
                phone: '0723319930',
                mail: 'vaginaInspector@gmail.com'
                },
                 {
                name: 'Muie2',
                position: 'Vicepresedinte Proiecte',
                phone: '0723319930',
                mail: 'vaginaInspector23@gmail.com'
                },
                 {
                name: 'Muie3',
                position: 'Vicepresedinte Proiecte',
                phone: '0723319930',
                mail: 'vaginaInspector@gmail.com'
                },
                   {
                name: 'Muie4',
                position: 'Vicepresedinte Proiecte',
                phone: '0723319930',
                mail: 'vaginaInspector@gmail.com'
                },
                   {
                name: 'Muie5',
                position: 'Vicepresedinte Proiecte',
                phone: '0723319930',
                mail: 'vaginaInspector@gmail.com'
                },
                   {
                name: 'Muie6',
                position: 'Vicepresedinte Proiecte',
                phone: '0723319930',
                mail: 'vaginaInspector@gmail.com'
                },   {
                name: 'Muie7',
                position: 'Vicepresedinte Proiecte',
                phone: '0723319930',
                mail: 'vaginaInspector@gmail.com'
                }
                ,   {
                name: 'Muie8',
                position: 'Vicepresedinte Proiecte',
                phone: '0723319930',
                mail: 'vaginaInspector@gmail.com'
                }
                ,   {
                name: 'Muie9',
                position: 'Vicepresedinte Proiecte',
                phone: '0723319930',
                mail: 'vaginaInspector@gmail.com'
                }
            ],
        }
        
    },
    components:{
        card
    },

}
</script>
<style scoped>
h2{
    text-align: center;
}
.board-container{
    display:flex;
    justify-content: center;
    flex-direction: row;
}

.title{
    display:flex;
    justify-content: center;
}

.cards{
    display:flex;
    justify-content: center;
}

</style>