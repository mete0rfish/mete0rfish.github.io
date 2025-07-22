<template>
  <div class="project-list">
    <project-component
      v-for="(project, index) in projects"
      :key="index"
      :title="project.title"
      :description="project.description"
      :github="project.github"
      :demo="project.demo"
      :techstack="project.techstack"
      :start-date="project.startDate"
      :end-date="project.endDate"
    />
  </div>
</template>

<script>
import ProjectComponent from './Project.vue';

export default {
  components: {
    ProjectComponent
  },
  name: 'ProjectList',
  data() {
    return {
      projects: [
        {
          title: '원툴 Onetool',
          description: '3D 건축 모델(CAD) 거래 및 학습 플랫폼',
          github: 'https://github.com/likelion-onetool/backend',
          demo: 'https://frontend-beta-two-45.vercel.app/',
          techstack: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'NCP', 'Docker', 'Github Actions', 'Prometheus', 'Grafana', 'K6'],
          startDate: '2024-03',
          endDate: '2025-03', // Present
        },
        {
          title: '끄적 GGZZ',
          description: 'AI 기반 필체 이미지 분석 서비스로 두 필체 이미지 유사도 분석 및 필체 기반 성격 분석 기능 제공',
          github: 'https://github.com/username/open-source-project',
          demo: '8월 중 플레이스토어 등재 예정',
          techstack: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'Github Actions'],
          startDate: '2025-03',
          endDate: '',
        },
        {
          title: '개인 웹 페이지',
          description: '지금 보고 있는 이 웹 페이지를 개발했어요!',
          github: 'https://github.com/mete0rfish/mete0rfish.github.io',
          demo: 'https://mete0rfish.github.io',
          techstack: ['Javascript', 'Vue.js'],
          startDate: '2025-06',
          endDate: '',
        }
      ]
    };
  }
};
</script>

<style scoped>
.project-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
  padding: 0.5rem 0;
}

@media (max-width: 768px) {
  .project-list {
    grid-template-columns: 1fr;
  }
}
</style>