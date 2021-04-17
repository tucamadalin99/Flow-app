<template>
  <div class="q-pa-md all">
    <div class="pie-container charts" style="width: 400px; height: 400px">
      <h4 id="pie-title">Total: {{ pieValues.length }}</h4>
      <canvas id="pie" width="400" height="400"></canvas>
    </div>
    <div class="bar-container charts" style="width: 400px; height: 400px">
      <h4 id="bar-title">Total: {{ barValues.length }}</h4>
      <canvas id="bar" width="400" height="400"></canvas>
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
      barValues: [],
    };
  },
  created() {},
  mounted() {
    let ctx = document.getElementById("pie");
    let ctx2 = document.getElementById("bar");
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
                label: "Percentage of activity",
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
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              title: {
                display: true,
                text: "Activity doughnut",
              },
            },
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
    Axios.get("http://localhost:8081/api/manager/getSalaryData", {
      withCredentials: true,
    })
      .then((response) => {
        this.barValues = response.data;
        console.log(this.barValues.map((el) => el.name));
        let barChart = new Chart(ctx2, {
          type: "bar",
          data: {
            labels: this.barValues.map((el) => el.name),
            datasets: [
              {
                label: "Salary",
                data: this.barValues.map((el) => el.salary),
                backgroundColor: ["rgba(173, 216, 250, 0.5)"],
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                stacked: true,
              },
            },
            plugins: {
              title: {
                display: true,
                text: "Salaries bar chart",
              },
            },
          },
        });
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
#pie-title {
  text-align: center;
}
#bar-title {
  text-align: center;
}
.all {
  display: flex;
  justify-content: center;
  align-items: center;
}
.charts {
  margin-left: 10%;
}
</style>