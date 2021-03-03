<template>
  <q-card class="activity-card">
    <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" basic>
      <div class="absolute-bottom text-h6">{{ projectName }}</div>
    </q-img>

    <q-card-section> Task: {{ taskName }} </q-card-section>
    <q-card-section> {{ startDate }} - {{ endDate }} </q-card-section>
    <q-card-section>
      {{ status }}
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ["projectName", "taskName", "startDate", "endDate", "status"],
};
</script>

<style>
.activity-card {
  width: 100%;
  max-width: 250px;
  padding: 0.5%;
  margin: 2%;
}
</style>