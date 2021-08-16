<template>
  <div class="page-container">
    <h2 class="page-title">Department Statistics</h2>
    <div class="q-pa-md all">
      <div class="pie-container charts" style="width: 27em; height: 27em">
        <canvas id="pie" width="400" height="400"></canvas>
      </div>
      <div class="bar-container charts" style="width: 27em; height: 27em">
        <canvas id="bar" width="400" height="400"></canvas>
      </div>
      <div class="line-container charts" style="width: 27em; height: 27em">
        <canvas id="line" width="400" height="400"></canvas>
      </div>
    </div>
    <q-btn @click="printPage" icon="print" color="primary" class="print-btn"
      >Printer</q-btn
    >
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
      lineValues: [],
    };
  },
  methods: {
    printPage() {
      const btn = document.querySelector(".print-btn");
      btn.style.display = "none";
      window.print();
      btn.style.display = "block";
    },
  },
  created() {},
  mounted() {
    let ctx = document.getElementById("pie");
    let ctx2 = document.getElementById("bar");
    let ctx3 = document.getElementById("line");
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
                backgroundColor: ["rgba(250, 231, 61, 0.5)"],
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
    Axios.get("http://localhost:8081/api/manager/getResolvedTasks", {
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data.map((el) => el.count));
        let lineChart = new Chart(ctx3, {
          type: "line",
          data: {
            labels: response.data.map((el) => el.name),
            datasets: [
              {
                label: "Percentage of activity",
                data: response.data.map((el) => el.count),
                backgroundColor: ["rgba(38, 166, 91, 0.5)"],
                borderColor: ["rgba(38, 166, 91, 0.5)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Activity line",
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

.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.all {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  border-radius: 10px;
}
.charts {
  margin-left: 3%;
}

.page-title {
  font-weight: bold;
  text-align: center;
}

.print-btn {
  margin-top: 5%;
}
</style>