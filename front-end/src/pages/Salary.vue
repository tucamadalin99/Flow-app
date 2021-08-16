<template>
  <div class="salaries-container-all">
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            Employee {{ this.editedItem.name }} {{ this.editedItem.surname }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none content">
          <q-icon color="green-8" size="sm" name="attach_money"></q-icon>
          <div class="input-salary">
            <q-input
              v-model="editedItem.salary"
              label="RON"
              @keyup.enter="prompt = false"
            />
          </div>
          <q-icon
            color="primary"
            size="sm"
            name="build_circle"
            style="margin-top: 15px"
          ></q-icon>
          <q-input
            class="input-role"
            dense
            v-model="editedItem.role"
            label="Role"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Confirm" v-close-popup @click="editEmployeeData" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="q-pa-md salary-table">
      <q-table
        title="Roles & Incomes"
        :data="data"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn
                size="sm"
                color="green-9"
                round
                dense
                @click="toggleActivity(props.row)"
                icon="edit"
              />
            </q-td>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="text-left">
                This is expand slot for row above: {{ props.row.name }}.
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      columns: [
        {
          name: "name",
          required: true,
          label: "Employee Name",
          align: "left",
          field: "name",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "surname",
          required: true,
          label: "Employee Surname",
          align: "left",
          field: "surname",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "role",
          required: true,
          label: "Role",
          align: "left",
          field: "role",
          sortable: true,
        },
        {
          name: "income",
          label: "Income(RON)",
          field: "salary",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
      ],
      data: [],
      prompt: false,
      editedItem: {
        name: "",
        surname: "",
        salary: 0,
        role: "",
      },
    };
  },
  methods: {
    toggleActivity(item) {
      this.editedItem = item;
      this.prompt = true;
    },
    editEmployeeData() {
      Axios.put(
        "http://localhost:8081/api/manager/modifySalary",
        {
          id: this.editedItem.id,
          role: this.editedItem.role,
          salary: this.editedItem.salary,
        },
        { withCredentials: true }
      )
        .then(() => {
          this.$q.notify({
            color: "indigo-8",
            textColor: "white",
            icon: "cloud_done",
            message: `${this.editedItem.name} ${this.editedItem.surname} modified successfully`,
          });
        })
        .catch(() => {
          this.$q.notify({
            color: "red-8",
            textColor: "white",
            icon: "warning",
            message: `Some error occurred...`,
          });
        });
    },
  },
  computed: {},
  async created() {
    Axios.get("http://localhost:8081/api/manager/getSalaryData", {
      withCredentials: true,
    }).then((response) => {
      this.data = response.data;
      console.log(this.data);
    });
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.salaries-container-all {
  display: flex;
  justify-content: center;
  align-items: center;

  .salary-table {
    width: 100%;
    max-width: 1200px;
  }
}
</style>

