<template>
  <div class="q-pa-md">
    <gantt
      id="gantt"
      :height="800"
      v-on:databinding="onDataBinding"
      v-on:databound="onDataBound"
      :editable-create="false"
      :data-source="localdatasource"
    >
    </gantt>
  </div>
</template>
<script>
import "@progress/kendo-ui";
import "@progress/kendo-theme-default/dist/all.css";
import { Gantt } from "@progress/kendo-gantt-vue-wrapper";
export default {
  name: "Gantt",
  components: {
    gantt: Gantt,
  },
  methods: {
    onDataBinding: function (ev) {
      console.log("Gantt is about to be bound!", ev);
    },
    onDataBound: function (ev) {
      console.log("Gantt bound");
    },
    addTask() {},
  },
  created() {},
  data: function () {
    return {
      apiDataSource: [],
      localdatasource: [
        {
          id: 0,
          orderId: 0,
          parentId: null,
          title: "Tap That Job",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2015/6/17 15:00"),
        },
        {
          id: 1,
          orderId: 1,
          parentId: 0,
          title: "Back-end API",
          percentComplete: 0.47,
          start: new Date("2014/6/17 09:00"),
          end: new Date("2014/6/17 12:00"),
        },
        {
          id: 2,
          orderId: 2,
          parentId: 0,
          title: "UI Components",
          percentComplete: 0.5,
          start: new Date("2014/6/17 09:30"),
          end: new Date("2014/6/17 12:30"),
        },
        {
          id: 3,
          orderId: 3,
          parentId: null,
          title: "SpringIT",
          start: new Date("2014/6/17 09:30"),
          end: new Date("2014/6/17 12:30"),
        },
        {
          id: 4,
          orderId: 4,
          parentId: 3,
          title: "Event Cards",
          percentComplete: 0.5,
          start: new Date("2014/6/17 09:30"),
          end: new Date("2014/6/17 12:30"),
        },
        {
          id: 5,
          orderId: 5,
          parentId: 3,
          title: "Unit testing on QA1",
          percentComplete: 0.5,
          start: new Date("2014/6/17 09:30"),
          end: new Date("2014/6/17 12:30"),
        },
        {
          id: 6,
          orderId: 6,
          parentId: null,
          title: "ITFest",
          start: new Date("2014/6/17 09:30"),
          end: new Date("2014/6/17 12:30"),
        },
        {
          id: 7,
          orderId: 7,
          parentId: 6,
          title: "CSS Styling",
          percentComplete: 0.5,
          start: new Date("2014/6/17 09:30"),
          end: new Date("2014/6/17 12:30"),
        },
        {
          id: 8,
          orderId: 8,
          parentId: 6,
          title: "UI/UX Research",
          percentComplete: 0.5,
          start: new Date("2014/6/17 09:30"),
          end: new Date("2014/6/17 12:30"),
        },
      ],
    };
  },
};
</script>

<style scoped>
.k-task-template {
  background-color: green;
}
</style>