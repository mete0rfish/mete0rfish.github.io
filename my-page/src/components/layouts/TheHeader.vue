<template>
    <header>
        <div class="logo">
            <h1>Meteorfish</h1>
        </div>
        <nav>
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/projects" class="nav-link">Project</router-link>
            <a href="https://parvegoongame.tistory.com/" class="nav-link external">Blog <span class="external-link">→</span></a>
            <a href="https://github.com/mete0rfish" class="nav-link external" target="_blank">Github <span class="external-link">→</span></a>
        </nav>
    </header>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #640032;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.logo {
  display: flex;
  align-items: center;
}

.logo h1 {
  color: white;
  margin: 0;
}

nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  transition: opacity 0.2s;
}

.nav-link:hover {
  opacity: 0.8;
}

.external-link {
  font-size: 0.8rem;
  margin-left: 0.2rem;
}
</style>