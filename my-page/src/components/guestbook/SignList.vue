<template>
    <ul>
        <h2>방명록</h2>
        <sign-component 
            v-for="sign in signs"
            :key="sign.id"
            :body="sign.body"
            :author="sign.author"
            :createdAt="sign.createdAt"
        ></sign-component>
    </ul>
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
ul {
    list-style: none;
    position: absolute;
    right: 1rem;
}

li {
    margin: 1rem;
}

div {
    width: 100%;
    max-width: 40rem;
    margin: 2rem auto;
    background-color: #c3c3c3;
    padding: 1rem;
}

h2 {
    text-align: center;
}
</style>
