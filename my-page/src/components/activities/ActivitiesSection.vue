<template>
  <div class="activities-section">
    <h2>참여 활동</h2>
    <div class="activities-container">
      <div 
        v-for="(activity, index) in activities" 
        :key="index" 
        class="activity-item"
      >
        <div class="activity-period">{{ activity.period }}</div>
        <div class="activity-content">
          <h3>{{ activity.title }}</h3>
          <p class="activity-description">{{ activity.description }}</p>
          <div v-if="activity.skills" class="activity-skills">
            <span 
              v-for="(skill, skillIndex) in activity.skills" 
              :key="skillIndex"
              class="skill-tag"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivitiesSection',
  data() {
    return {
      activities: [
        {
          period: '2024.03 ~ 2024.12',
          title: '멋쟁이사자처럼 12기',
          description: 'TDD 기반 스터디 및 페어 프로그래밍 진행',
          skills: ['Backend', 'Java', 'Spring Boot']
        },
        {
          period: '2024.04 ~ 2024.10',
          title: '한이음 ICT 멘토링',
          description: '실무자와 함께하는 ICT 멘토링 수료',
          skills: ['Leader', 'Backend', 'Java', 'Spring Boot']
        },
        {
          period: '2025.07 ~ 진행 중',
          title: '오픈소스 컨트리뷰션 아카데미',
          description: 'Node.js 오픈소스 컨트리뷰션 멘티 진행',
          skills: ['OpenSource','Node.js', 'Javascript', 'C++']
        }
      ]
    }
  }
}
</script>

<style scoped>
.activities-section {
  margin-top: 3rem;
  width: 100%;
}

.activities-section h2 {
  color: #640032;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.activities-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.activity-item {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.activity-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.activity-period {
  min-width: 120px;
  font-weight: 600;
  color: #640032;
}

.activity-content {
  flex: 1;
}

.activity-content h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.activity-description {
  margin: 0.5rem 0 1rem 0;
  color: #495057;
  line-height: 1.6;
}

.activity-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.8rem;
}

.skill-tag {
  background-color: #f1f3f5;
  color: #495057;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.skill-tag:hover {
  background-color: #640032;
  color: white;
}

@media (max-width: 768px) {
  .activity-item {
    flex-direction: column;
    gap: 1rem;
  }
  
  .activity-period {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e9ecef;
  }
}
</style>
