<template>
    <div class="sign-list">
        <h2>방명록</h2>
        <sign-component 
            v-for="sign in signs"
            :key="sign.id"
            :body="sign.body"
            :author="sign.author"
            :createdAt="sign.createdAt"
        ></sign-component>
        <div class="sign-button-container">
            <a href="https://github.com/mete0rfish/mete0rfish/issues/new" target="_blank" class="sign-button">
                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" class="github-icon">
                <span>방명록 남기러가기</span>
            </a>
        </div>
    </div>
</template>

<script>
import SignComponent from './Sign.vue';

export default {
    components: {
        SignComponent
    },
    data() {
        return {
            signs: [],
        }
    },
    methods: {
        async fetchLatestIssue() {
            try {
                const res = await fetch('/sign-data.json');
                if(!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await res.json();
                console.log(data);
                this.signs = data.map(sign => ({
                    id: sign.id,
                    body: sign.body,
                    author: sign.author,
                    createdAt: sign.created_at
                }));
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        this.fetchLatestIssue();
    }
}
</script>

<style scoped>
.sign-list {
  width: 100%;
  height: 100%;
}

.sign-list h2 {
  color: #640032;
  margin-bottom: 2rem;
}

.sign-list ul {
  list-style: none;
  padding: 0;
}

.sign-list ul li {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.sign-list ul li:last-child {
  margin-bottom: 2rem;
}

.sign-button-container {
  text-align: center;
}

.sign-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.sign-button:hover {
  background-color: #218838;
}

.github-icon {
  width: 20px;
  height: 20px;
  margin-top: -2px; /* 수직 중앙 정렬을 위한 조정 */
}
</style>
