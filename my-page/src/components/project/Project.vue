<template>
  <div class="project">
    <base-card class="project-card">
      <div class="project-header">
        <h3 class="project-title">{{ title }}</h3>
        <div class="project-period">
          <i class="fas fa-calendar-alt"></i>
          <span>{{ formatDate(startDate) }} ~ {{ formatDate(endDate) }}</span>
        </div>
      </div>
      
      <p class="project-description">{{ description }}</p>
      
      <div v-if="techstack" class="tech-stack">
        <span 
          v-for="(tech, index) in techstackArray" 
          :key="index"
          class="tech-tag"
        >
          {{ tech }}
        </span>
      </div>
      
      <div class="project-links">
        <a 
          v-if="github" 
          :href="github" 
          target="_blank" 
          rel="noopener noreferrer"
          class="project-link"
        >
          <i class="fab fa-github"></i> GitHub
        </a>
        <a 
          v-if="demo" 
          :href="demo" 
          target="_blank" 
          rel="noopener noreferrer"
          class="project-link"
        >
          <i class="fas fa-external-link-alt"></i> Live Demo
        </a>
      </div>
    </base-card>
  </div>
</template>

<script>
export default {
  name: 'ProjectComponent',
  props: ['title', 'description', 'github', 'demo', 'techstack', 'startDate', 'endDate'],
  computed: {
    techstackArray() {
      if (!this.techstack) return [];
      return Array.isArray(this.techstack) ? this.techstack : [this.techstack];
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return 'Present';
      const options = { year: 'numeric', month: 'short' };
      return new Date(dateString).toLocaleDateString('ko-KR', options);
    }
  }
}
</script>

<style scoped>
.project {
  width: 100%;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
}

.project:hover {
  transform: translateY(-2px);
}

.project-card {
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.project-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.project-title {
  margin: 0;
  color: #2c3e50;
  font-size: 1.25rem;
  font-weight: 600;
}

.project-period {
  display: flex;
  align-items: center;
  color: #6c757d;
  font-size: 0.9rem;
}

.project-period i {
  margin-right: 0.5rem;
  color: #640032;
}

.project-description {
  color: #495057;
  line-height: 1.6;
  margin-bottom: 1.25rem;
  flex-grow: 1;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.tech-tag {
  background-color: #f1f3f5;
  color: #495057;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.tech-tag:hover {
  background-color: #640032;
  color: white;
  transform: translateY(-1px);
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  color: #640032;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  padding: 0.4rem 0.8rem;
  border: 1px solid #e9ecef;
  border-radius: 4px;
}

.project-link:hover {
  background-color: #f8f0f5;
  transform: translateY(-1px);
}

.project-link i {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .project-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .project-period {
    align-self: flex-start;
  }
}
</style>
