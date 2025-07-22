<template>
  <div class="home-container">
    <div class="profile-section">
      <div class="profile-content">
        <h1>웹 개발자, 윤성원</h1>
        <div class="profile-info">
          <div class="profile-text">
            웹 개발자로 성장하고 있는 개발자입니다.
            <br/>
            새로운 기술을 배우는 것을 좋아합니다.
            <br/>
            함께 성장하는 소프트웨어 개발을 추구합니다.
          </div>
          <div class="profile-image">
            <img width="200" height="200" src="https://github.com/user-attachments/assets/af9c0493-e70d-46e4-a898-7e0b5228bd4b" alt="프로필 사진">
          </div>
        </div>
        
        <SkillsSection />
        <ActivitiesSection />
      </div>
    </div>
    
    <div class="sign-section">
      <SignList />
    </div>
  </div>
</template>

<script>
import SignList from '../components/guestbook/SignList.vue'
import SkillsSection from '../components/skills/SkillsSection.vue'
import ActivitiesSection from '../components/activities/ActivitiesSection.vue'

export default {
  name: 'HomePage',
  components: {
    SignList,
    SkillsSection,
    ActivitiesSection
  }
}
</script>

<style scoped>
.home-container {
  padding: 2rem;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  max-width: 1000px;
  align-items: flex-start;
}

.profile-section {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  width: 600px;
  max-width: 600px;
}

.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-top: 1rem;
}

.profile-text {
  flex: 1;
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-image {
  display: flex;
  align-items: center;
}

.profile-image img {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.profile-content h1 {
  color: #640032;
  margin-bottom: 1rem;
  width: 100%;
  text-align: center;
}

.profile-text {
  color: #495057;
  line-height: 1.6;
  font-size: 1.2rem;
  font-weight: bold;
}

.sign-section {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 400px;
  max-width: 400px;
}

.sign-section h2 {
  color: #640032;
  margin-bottom: 2rem;
}
</style>
