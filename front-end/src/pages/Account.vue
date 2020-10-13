<template>
  <q-page class="flex-center">
    <div class="account-header">
      <q-avatar size="130px" class="avatar">
        <img
          class="profile-pic"
          src="https://cdn.quasar.dev/img/boy-avatar.png"
        />
      </q-avatar>
    </div>
    <div class="account-info">
      <q-chip square icon="book">Nume Prenume</q-chip>
      <q-chip square icon="book">Departament</q-chip>
      <q-chip square icon="book">Facebook</q-chip>
      <q-chip square icon="book">Git</q-chip>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "AccountPage"
};
</script>
<style scoped>
.account-header {
  display: flex;
  justify-content: center;
  background-image: linear-gradient(to left bottom, #2d6cb5, #1a154c);
}
.avatar {
  margin-top: 10px;
  margin-bottom: 10px;
}
.profile-pic {
  border: 3px solid #2d6cb5;
}
.account-info {
  display: flex;
  justify-content: center;
}
</style>
