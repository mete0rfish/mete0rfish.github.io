<template>
  <div class="projects-container">
    <h2>Projects</h2>
    <p>개발에 참여한 팀 및 개인 프로젝트 목록</p>
    <project-list></project-list>
  </div>
</template>

<script>
import ProjectList from '../components/project/ProjectList.vue';

export default {
  name: 'ProjectsPage',
  components: {
    ProjectList
  }
}
</script>

<style scoped>
.projects-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  color: #640032;
  margin-bottom: 1rem;
}
</style>
