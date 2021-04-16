<template>
  <div class="q-pa-md">
    <div class="pie-container" style="width: 400px; height: 400px">
      <canvas id="pie" width="400" height="400"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import Axios from "axios";
export default {
  data() {
    return {
      pieValues: [],
    };
  },
  created() {},
  mounted() {
    let ctx = document.getElementById("pie");
    console.log(ctx);

    Axios.get("http://localhost:8081/api/manager/getActivePercentage", {
      withCredentials: true,
    })
      .then((response) => {
        this.pieValues = response.data.map((el) => el);
        console.log(this.pieValues);
        let pieChart = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["Active", "Inactive", "Junior"],
            datasets: [
              {
                label: "#",
                data: this.pieValues,
                backgroundColor: [
                  "rgba(38, 166, 91, 0.5)",
                  "rgba(255, 99, 132, 0.5)",
                  "rgba(255, 206, 86, 0.5)",
                ],
                borderColor: [
                  "rgba(38, 166, 91, 0.5)",
                  "rgba(255, 99, 132, 0.5)",
                  "rgba(255, 206, 86, 0.5)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>