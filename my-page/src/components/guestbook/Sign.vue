<template>
    <li>
        <base-card>
            <h3>{{ author }}</h3>
            <p>{{ message }}</p>
            <p>{{ createdAt }}</p>
        </base-card>
    </li>
</template>

<script>
export default {
    name: 'sign-component',
    props: ['message', 'author', 'createdAt']
}
</script>

<style scoped>
li {
  margin: auto;
  max-width: 40rem;
}

p {
  margin: 0.5rem 0;
}
</style>