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
import card from "../components/Card";
export default {
  name: "BoardPage",
  data() {
    return {
      items: [
        {
          name: "Lorem",
          position: "Vicepresedinte Proiecte",
          phone: "0723319930",
          mail: "example@gmail.com",
        },
        {
          name: "Ipsum",
          position: "Vicepresedinte Proiecte",
          phone: "0723319930",
          mail: "example@gmail.com",
        },
        {
          name: "Dolor",
          position: "Vicepresedinte Proiecte",
          phone: "0723319930",
          mail: "example@gmail.com",
        },
        {
          name: "Sit",
          position: "Vicepresedinte Proiecte",
          phone: "0723319930",
          mail: "example@gmail.com",
        },
        {
          name: "Amet",
          position: "Vicepresedinte Proiecte",
          phone: "0723319930",
          mail: "example@gmail.com",
        },
        {
          name: "Consectitur",
          position: "Vicepresedinte Proiecte",
          phone: "0723319930",
          mail: "example@gmail.com",
        },
        {
          name: "Elit",
          position: "Vicepresedinte Proiecte",
          phone: "0723319930",
          mail: "example@gmail.com",
        },
        {
          name: "Alpha",
          position: "Vicepresedinte Proiecte",
          phone: "0723319930",
          mail: "example@gmail.com",
        },
        {
          name: "Epsilon",
          position: "Vicepresedinte Proiecte",
          phone: "0723319930",
          mail: "example@gmail.com",
        },
      ],
    };
  },
  components: {
    card,
  },
};
</script>
<style scoped>
h2 {
  text-align: center;
}
.board-container {
  display: flex;
  justify-content: center;
  flex-direction: row;
}

.title {
  display: flex;
  justify-content: center;
}

.cards {
  display: flex;
  justify-content: center;
}
</style>