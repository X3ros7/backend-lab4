<template>
  <div class="about">
    <div class="actions">
      <button @click="auth.logout" class="btn btn-primary">Logout</button>

    </div>
    <h1>This is an secured page</h1>
    <table>
      <tr>
        <th>Key</th>
        <th>Value</th>
      </tr>
      <tr v-for="(value, key) of auth.userInfo" :key="key">
        <td>{{ key.toUpperCase() }}</td>
        <td>{{ value }}</td>
      </tr>
      <tr>
        <td>Token</td>
        <td style="word-wrap: break-word; max-width: 200px">{{ auth.keycloakInstance().token }}</td>
      </tr>
      <tr>
        <td>Refresh token</td>
        <td style="word-wrap: break-word; max-width: 200px">{{ auth.keycloakInstance().refreshToken }}</td>
      </tr>
      <tr>
        <td>Id token</td>
        <td style="word-wrap: break-word; max-width: 200px">{{ auth.keycloakInstance().idToken }}</td>
      </tr>
    </table>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts'

const auth = useAuthStore()

</script>
<style>
@media (min-width: 1024px) {
  .about1 {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
button {
  margin: 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>
