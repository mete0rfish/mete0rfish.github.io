<template>
  <div class="home-container">
    <h2>방명록</h2>
    <SignList />
  </div>
</template>

<script>
import SignList from '../components/guestbook/SignList.vue'

export default {
  name: 'HomePage',
  components: {
    SignList
  }
}
</script>

<style scoped>
.home-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  color: #640032;
  margin-bottom: 2rem;
}
</style>
