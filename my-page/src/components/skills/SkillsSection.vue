<template>
  <div class="skills-section">
    <h2>기술 스택</h2>
    <div class="skills-container">
      <div class="skill-category">
        <h3>Frontend</h3>
        <div class="skill-items">
          <span 
            v-for="(skill, index) in frontendSkills" 
            :key="'frontend-' + index" 
            class="skill-tag"
          >
            {{ skill }}
          </span>
        </div>
      </div>
      
      <div class="skill-category">
        <h3>Backend</h3>
        <div class="skill-items">
          <span 
            v-for="(skill, index) in backendSkills" 
            :key="'backend-' + index" 
            class="skill-tag"
          >
            {{ skill }}
          </span>
        </div>
      </div>
      
      <div class="skill-category">
        <h3>기타</h3>
        <div class="skill-items">
          <span 
            v-for="(skill, index) in otherSkills" 
            :key="'other-' + index" 
            class="skill-tag"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkillsSection',
  data() {
    return {
      frontendSkills: ['JavaScript', 'Vue.js'],
      backendSkills: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'MySQL', 'Redis'],
      otherSkills: ['Git', 'GitHub', 'Docker', 'AWS', 'GCP', 'Slack']
    }
  }
}
</script>

<style scoped>
.skills-section {
  margin-top: 2rem;
  width: 100%;
}

.skills-section h2 {
  color: #640032;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
}

.skill-category {
  flex: 1;
  min-width: 200px;
}

.skill-category h3 {
  color: #495057;
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
}

.skill-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background-color: #e9ecef;
  color: #495057;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.skill-tag:hover {
  background-color: #640032;
  color: white;
  transform: translateY(-2px);
}
</style>
