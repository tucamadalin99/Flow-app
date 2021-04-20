<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>{{ division.name }}</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item
        v-for="member in division.members"
        :key="member.id"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ member.name[0] }}{{member.surname[0]}}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ member.name }} {{member.surname }}</q-item-label>
          <q-item-label caption lines="1">{{ member.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="green" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
export default {
  props: ["division"],
};
</script>