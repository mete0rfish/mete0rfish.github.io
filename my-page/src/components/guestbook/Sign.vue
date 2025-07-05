<template>
    <div class="sign-item">
        <base-card>
            <h3>{{ author }}</h3>
            <p>{{ body }}</p>
            <p>{{ createdAt }}</p>
        </base-card>
    </div>
</template>

<script>
export default {
    name: 'sign-component',
    props: ['body', 'author', 'createdAt']
}
</script>

<style scoped>
.sign-item {
  width: 100%;
  margin-bottom: 1rem;
}

.sign-item :deep(.base-card) {
  margin: 0;
}

p {
  margin: 0.5rem 0;
}
</style>