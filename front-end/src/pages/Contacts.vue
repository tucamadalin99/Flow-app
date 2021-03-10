<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-sm">
      <!-- <div class="col">
        <q-table
          title="Simple"
          :data="data"
          :columns="columns"
          row-key="name"
          dense
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>
              <q-btn dense round flat color="grey" @click="deleteRow(props)" icon="delete"></q-btn>
            </q-td>          
          </template>
        </q-table>
      </div> -->

      <div class="col">
        <q-table
          flat
          bordered
          class="statement-table"
          title="Contacts & Task Tracker"
          :data="userData"
          :hide-header="mode === 'grid'"
          :columns="usersColumns"
          row-key="__index"
          :grid="mode == 'grid'"
          :filter="filter"
          virtual-scroll
          :pagination.sync="pagination"
          :rows-per-page-options="[0]"
        >
          <template v-slot:top-right="props">
            <q-select
              class="filters"
              @input="handleFilterStatus($event)"
              v-model="filteredStatusValue"
              dense
              outlined
              debounce
              style="margin-right: 5px; width: 150px"
              :options="['All', 'Active', 'Inactive', 'Junior']"
              label="Status"
            />
            <q-select
              class="filters"
              @input="handleFilterDepartment($event)"
              v-model="filteredDepValue"
              dense
              outlined
              debounce
              style="margin-right: 5px; width: 210px"
              :options="[
                'All',
                'Human Resources',
                'Information Technology',
                'Public Relations',
                'Sales',
              ]"
              label="Department"
            />

            <q-input
              class="filters"
              outlined
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search by any field"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>

            <q-btn
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="setFs(props)"
            >
              <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>{{
                props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"
              }}</q-tooltip>
            </q-btn>

            <q-btn
              flat
              round
              dense
              :icon="mode === 'grid' ? 'list' : 'grid_on'"
              @click="mode = mode === 'grid' ? 'list' : 'grid'"
            >
              <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>{{
                mode === "grid" ? "List" : "Grid"
              }}</q-tooltip>
            </q-btn>
            <div class="q-pa-sm q-gutter-sm">
              <q-dialog v-model="show_dialog">
                <q-card style="width: 600px; max-width: 100vw">
                  <q-card-section>
                    <q-btn
                      round
                      flat
                      dense
                      icon="close"
                      class="float-right"
                      color="grey-8"
                      v-close-popup
                    ></q-btn>
                    <div class="text-h6">Contact Profile</div>
                  </q-card-section>
                  <q-separator inset></q-separator>
                  <q-card-section class="q-pt-none">
                    <q-form class="q-gutter-md">
                      <q-list>
                        <q-item>
                          <q-item-section>
                            <q-item-label class="q-pb-xs">Name</q-item-label>
                            <!-- <q-input dense outlined v-model="editedItem.name" /> -->
                            <q-chip
                              color="primary"
                              text-color="white"
                              icon="person"
                              size="18px"
                            >
                              {{ editedItem.name }}
                            </q-chip>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section>
                            <q-item-label class="q-pb-xs">Email</q-item-label>
                            <!-- <q-input
                              dense
                              outlined
                              v-model="editedItem.email"
                            /> -->
                            <q-chip
                              color="primary"
                              text-color="white"
                              icon="email"
                              size="18px"
                            >
                              {{ editedItem.email }}
                            </q-chip>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section>
                            <q-item-label class="q-pb-xs"
                              >Phone (tap to call)</q-item-label
                            >
                            <!-- <q-input
                              dense
                              outlined
                              v-model="editedItem.phone"
                            /> -->
                            <q-chip
                              color="primary"
                              text-color="green-5"
                              icon="phone"
                              size="18px"
                            >
                              <a
                                class="phone-href"
                                :href="'tel:' + editedItem.phone"
                              >
                                {{ editedItem.phone }}
                              </a>
                            </q-chip>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section>
                            <q-item-label class="q-pb-xs">Role</q-item-label>
                            <!-- <q-input dense outlined v-model="editedItem.role" /> -->
                            <q-chip
                              color="primary"
                              text-color="white"
                              icon="work"
                              size="18px"
                            >
                              {{ editedItem.role }}
                            </q-chip>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section>
                            <q-item-label class="q-pb-xs"
                              >Facebook</q-item-label
                            >
                            <!-- <q-input
                              dense
                              outlined
                              v-model="editedItem.facebook"
                            /> -->
                            <q-chip
                              color="primary"
                              text-color="white"
                              icon="facebook"
                              size="18px"
                            >
                              {{ editedItem.facebook }}
                            </q-chip>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section>
                            <q-item-label class="q-pb-xs">Git</q-item-label>
                            <!-- <q-input dense outlined v-model="editedItem.git" /> -->
                            <q-chip
                              color="primary"
                              text-color="white"
                              icon="account_tree"
                              size="18px"
                            >
                              {{ editedItem.git }}
                            </q-chip>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-form>
                  </q-card-section>
                  <q-card-section>
                    <q-card-actions align="right">
                      <q-btn
                        flat
                        label="Cancel"
                        color="warning"
                        dense
                        v-close-popup
                      ></q-btn>
                      <q-btn
                        v-if="statusChangePermission"
                        flat
                        label="OK"
                        color="primary"
                        dense
                        v-close-popup
                        @click="updateRow"
                      ></q-btn>
                    </q-card-actions>
                  </q-card-section>
                </q-card>
              </q-dialog>
            </div>

            <div class="q-pa-sm q-gutter-sm">
              <q-dialog v-model="show_activity">
                <q-card style="width: 600px; max-width: 100vw">
                  <q-card-section>
                    <q-btn
                      round
                      flat
                      dense
                      icon="close"
                      class="float-right"
                      color="grey-8"
                      v-close-popup
                    ></q-btn>
                    <div class="text-h6">
                      {{ "Activity of " + editedItem.name }}
                    </div>
                  </q-card-section>
                  <q-separator inset></q-separator>
                  <q-card-section class="q-pt-none">
                    <q-form class="q-gutter-md">
                      <q-list v-if="tasksLength > 0">
                        <q-item
                          class="col projects"
                          :key="project.name"
                          v-for="project in editedItem.activity"
                        >
                          <q-item-section>
                            <!-- <q-input dense outlined v-model="editedItem.git" /> -->
                            <q-chip
                              color="primary"
                              text-color="white"
                              icon="work"
                              size="18px"
                            >
                              {{ project.name }}
                            </q-chip>
                          </q-item-section>
                          <q-item-section>
                            <ul>
                              <li v-for="task in project.tasks" :key="task.id">
                                {{ task.name }}
                              </li>
                            </ul>
                          </q-item-section>
                        </q-item>
                      </q-list>
                      <p class="text-h6 text-center q-pt-lg" v-else>
                        <q-icon
                          class="q-mr-xs"
                          size="md"
                          name="sentiment_very_dissatisfied"
                        />No activity
                      </p>

                      <q-item v-if="statusChangePermission">
                        <q-item-section>
                          <q-item-label class="q-pb-xs"
                            >Status:Active/Inactive</q-item-label
                          >
                          <q-select
                            outlined
                            v-model="editedItem.status"
                            :options="['Active', 'Inactive']"
                            label="Current Status"
                          />
                        </q-item-section>
                      </q-item>
                    </q-form>
                  </q-card-section>
                  <q-card-section>
                    <q-card-actions align="right">
                      <q-btn
                        flat
                        label="Cancel"
                        color="warning"
                        dense
                        v-close-popup
                      ></q-btn>
                      <q-btn
                        v-if="statusChangePermission"
                        flat
                        label="OK"
                        color="primary"
                        dense
                        v-close-popup
                        @click="updateRow"
                      ></q-btn>
                    </q-card-actions>
                  </q-card-section>
                </q-card>
              </q-dialog>
            </div>
          </template>

          <template #body-cell-activity="props">
            <q-td :props="props">
              <q-btn
                size="sm"
                color="primary"
                round
                dense
                @click="toggleActivity(props.row)"
                icon="assignment_returned"
              />
            </q-td>
          </template>

          <template #body-cell-status="props">
            <q-td :props="props">
              <q-chip
                :color="
                  props.row.status == 'Active'
                    ? 'green-8'
                    : props.row.status == 'Inactive'
                    ? 'red-8'
                    : 'orange-8'
                "
                text-color="white"
                dense
                class="text-weight-bolder"
                square
                >{{ props.row[props.col.name] }}</q-chip
              >
            </q-td>
          </template>
          <template #body-cell-action="props">
            <q-td>
              <q-btn
                dense
                flat
                round
                color="blue"
                field="edit"
                icon="person"
                @click="editItem(props.row)"
              ></q-btn>
            </q-td>
          </template>

          <!--           <template v-slot:bottom>
            <div class="pagination-total q-mt-sm flex flex-center">
              <div class="text-medium-regular">
                Total {{ userData.length }}
                <span v-if="totalRecord > 1">results</span>
                <span v-else>result</span>
              </div>
            </div>
            <div class="pagination-container q-my-sm flex flex-center">
              <q-pagination
                v-model="page"
                color="secondary"
                :input="true"
                :max="pageCount"
                :max-pages="6"
                @input="fetchData(false)"
                :boundary-numbers="true"
              />
            </div>
          </template> -->

          <template v-slot:item="props">
            <div
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
              :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <q-card :class="props.selected ? 'bg-grey-2' : ''">
                <!--             <q-card-section>
                  <q-checkbox dense v-model="props.selected" :label="props.row.name"></q-checkbox>
                  {{props.row.name}}
                </q-card-section>
                <q-separator></q-separator> -->

                <q-list dense>
                  <q-item class="col" v-for="col in props.cols" :key="col.name">
                    <q-item-section>
                      <q-item-label>{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-chip
                        v-if="col.name === 'status'"
                        :color="
                          props.row.status == 'Active'
                            ? 'green-8'
                            : props.row.status == 'Inactive'
                            ? 'red-8'
                            : 'orange-8'
                        "
                        text-color="white"
                        dense
                        class="text-weight-bolder"
                        square
                        >{{ col.value }}</q-chip
                      >
                      <q-btn
                        v-else-if="col.name === 'action'"
                        dense
                        flat
                        color="primary"
                        field="edit"
                        icon="person"
                        @click="editItem(props.row)"
                      ></q-btn>
                      <q-btn
                        v-else-if="col.name === 'activity'"
                        size="sm"
                        color="primary"
                        round
                        dense
                        @click="toggleActivity(props.row)"
                        icon="assignment_returned"
                      ></q-btn>
                      <q-item-label
                        style="font-size: 13px"
                        v-else
                        caption
                        :class="col.classes ? col.classes : ''"
                        >{{ col.value }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Axios from "axios";
export default {
  data() {
    return {
      statusChangePermission: false,
      inFs: false,
      tasksLength: 0,
      columns: [
        // { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
        // { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        // { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        // { name: 'protein', label: 'Protein (g)', field: 'protein' },
        // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
      ],
      filteredDepValue: "",
      filteredStatusValue: "",

      noti: () => {},
      show_dialog: false,
      show_activity: false,
      editedIndex: -1,
      editedItem: {
        name: "",
        email: "",
        phone: "",
        role: "",
        phone: "",
        facebook: "",
        status: "",
      },
      defaultItem: {
        name: "",
        email: "",
        phone: "",
        role: "",
        phone: "",
        facebook: "",
        status: "",
      },
      filter: "",
      mode: "list",
      usersColumns: [
        {
          name: "activity",
          align: "left",
          label: "Activity",
        },
        {
          name: "name",
          align: "left",
          label: "Name",
          field: "name",
          sortable: true,
        },
        {
          name: "department",
          required: true,
          label: "Department",
          align: "center",
          field: "department",
          sortable: true,
        },
        {
          name: "email",
          align: "center",
          label: "Email",
          field: "email",
          sortable: true,
          classes: "text-green email",
        },
        // {
        //   name: "spotRate",
        //   align: "left",
        //   label: "Spot Rate",
        //   field: "spotRate",
        //   sortable: true
        // },
        {
          name: "phone",
          align: "center",
          label: "Phone",
          field: "phone",
          sortable: true,
          classes: "text-green",
        },
        // {
        //   name: "facebook",
        //   align: "center",
        //   labelalign: "left",
        //   label: "facebook",
        //   field: "facebook",
        //   sortable: true
        // },
        {
          name: "status",
          align: "center",
          label: "Status",
          field: "status",
          sortable: true,
        },
        {
          name: "action",
          align: "left",
          label: "Profile",
          field: "action",
        },
      ],
      userData: [],
      pagination: {
        page: 1,
      },
      page: 1,
      totalRecord: 0,
      pageCount: 1,
    };
  },
  methods: {
    editRow(props) {
      this.noti();
      // do something
      this.noti = this.$q.notify({
        type: "info",
        textColor: "grey-10",
        multiLine: true,
        message: `I'll edit row data => ${JSON.stringify(props.row)
          .split(",")
          .join(", ")}`,
        timeout: 2000,
      });
    },
    deleteRow(props) {
      this.noti();
      // do something
      this.noti = this.$q.notify({
        type: "negative",
        multiline: true,
        message: `I'll delete row data => ${JSON.stringify(props.row)
          .split(",")
          .join(", ")}`,
        timeout: 2000,
      });
    },
    addRow() {
      if (this.editedIndex > -1) {
        Object.assign(this.userData[this.editedIndex], this.editedItem);
      } else {
        this.userData.push(this.editedItem);
      }
      this.close();
    },
    deleteItem(item) {
      const index = this.userData.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.userData.splice(index, 1);
    },
    editItem(item) {
      this.editedIndex = this.userData.findIndex(
        (v, i) => v.__index === item.__index
      );
      this.editedItem = Object.assign({}, item);
      this.show_dialog = true;
    },
    toggleActivity(item) {
      this.editedIndex = this.userData.findIndex(
        (v, i) => v.__index === item.__index
      );
      this.editedItem = Object.assign({}, item);
      this.tasksLength = Object.keys(this.editedItem.activity).length;
      this.show_activity = true;
    },
    close() {
      this.show_dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    setFs(props) {
      props.toggleFullscreen();
      this.inFs = props.inFullscreen;
    },
    updateRow() {
      this.userData.splice(this.editedIndex, 1, this.editedItem);
      Axios.put(
        "http://localhost:8081/api/manager/changeStatus",
        { email: this.editedItem.email, status: this.editedItem.status },
        { withCredentials: true }
      )
        .then(() => {
          this.$q.notify({
            type: "positive",
            message: `Member '${this.editedItem.name}' updated.`,
            timeout: 500,
          });
          this.fetchUsers(); //not sure if optimal
        })
        .catch((err) => console.log(err));
    },
    onStatusClick() {
      console.log("clicked");
    },
    handleFilterDepartment(value) {
      let storedUsers = this.getUsers;
      let filteredTable = [];
      if (value === "All" && this.filteredStatusValue !== "All") {
        storedUsers.forEach((el) => {
          if (el.status === this.filteredStatusValue) {
            filteredTable.push(el);
          }
        });
        this.userData = filteredTable;
      } else if (
        value !== "All" &&
        (this.filteredStatusValue === "" || this.filteredStatusValue === "All")
      ) {
        storedUsers.forEach((el) => {
          if (el.department === value) {
            filteredTable.push(el);
          }
        });
        this.userData = filteredTable;
      } else if (
        value !== "All" &&
        (this.filteredStatusValue !== "" || this.filteredStatusValue !== "All")
      ) {
        storedUsers.forEach((el) => {
          if (
            el.department === value &&
            el.status === this.filteredStatusValue
          ) {
            filteredTable.push(el);
          }
        });
        this.userData = filteredTable;
      } else {
        this.userData = storedUsers;
      }
    },
    handleFilterStatus(value) {
      let storedUsers = this.getUsers;
      let filteredTable = [];
      if (
        value !== "All" &&
        (this.filteredDepValue === "" || this.filteredDepValue === "All")
      ) {
        storedUsers.forEach((el) => {
          if (el.status === value) {
            filteredTable.push(el);
          }
        });
        this.userData = filteredTable;
      } else if (
        value !== "All" &&
        (this.filteredDepValue !== "" || this.filteredDepValue !== "All")
      ) {
        console.log("second");
        storedUsers.forEach((el) => {
          if (el.status === value && el.department === this.filteredDepValue) {
            filteredTable.push(el);
          }
        });
        this.userData = filteredTable;
      } else if (
        value === "All" &&
        this.filteredDepValue !== "All" &&
        this.filteredDepValue !== ""
      ) {
        storedUsers.forEach((el) => {
          if (el.department === this.filteredDepValue) {
            filteredTable.push(el);
          }
        });
        this.userData = filteredTable;
      } else {
        this.userData = storedUsers;
      }
    },
    ...mapActions(["fetchUsers"]),
  },
  computed: mapGetters(["getUsers", "getUser"]),
  created() {
    const currentUser = this.getUser;
    if (currentUser.isManager || currentUser.isCEO) {
      this.statusChangePermission = true;
    }
    console.log("getter", this.statusChangePermission);
    //console.log("morti", this.getUsers);
    this.userData = this.getUsers;
    console.log(this.userData);
  },
  mounted() {
    // add indices
    this.userData = this.userData.map((v, i) => ({ ...v, __index: i }));
  },
};
</script>

<style scoped>
/* .email:hover {
  background-color: lightcoral;
} */
td:hover {
  color: lightcoral;
}

.col-xs-12 {
  margin-left: 6.1%;
  margin-top: 2%;
  border-radius: 2%;
}

.projects {
  display: flex;
  flex-direction: column;
}

.phone-href {
  text-decoration: none;
  color: white;
}

@media only screen and (max-width: 600px) {
  .filters {
    margin: 2%;
  }

  .col-xs-12 {
    margin-left: 0;
    margin-top: 0;
    border-radius: 0;
  }

  .q-chip {
    max-width: 300px;
  }
}
</style>