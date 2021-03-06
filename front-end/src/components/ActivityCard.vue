<template>
  <q-card class="activity-card">
    <q-img
      src="https://cdn.quasar.dev/img/parallax2.jpg"
      style="height: 300px"
      basic
    >
      <div class="absolute-bottom text-h6">{{ projectName }}</div>
    </q-img>

    <q-card-section>
      <q-table :data="tasks" :columns="columns" row-key="name" />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          name: "name",
          required: true,
          label: "Task Name",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "startDate",
          align: "center",
          label: "Start",
          field: "startDate",
          sortable: true,
        },
        { name: "endDate", label: "End", field: "endDate", sortable: true },
        { name: "type", label: "Type", field: "type" },
      ],
      data: [],
    };
  },
  props: ["projectName", "tasks"],
};
</script>

<style>
.activity-card {
  width: 100%;
  max-width: 750px;
  padding: 0.5%;
  margin: 2%;
}
</style>