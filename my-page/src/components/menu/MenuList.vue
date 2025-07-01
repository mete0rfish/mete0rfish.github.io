<template>
    <ul>
        <menu-component
            v-for="menu in menus"
            :key="menu.id"
            :name="menu.name"
            :link="menu.link"
        ></menu-component>
    </ul>
</template>

<script>
import MenuComponent from './Menu.vue';

export default {
    components: {
        MenuComponent
    },
    data() {
        return {
            menus: [
                { id: 1, name: 'GitHub', link: 'https://github.com/mete0rfish', bgColor: '#3498db' },
                { id: 2, name: 'LinkedIn', link: 'https://www.linkedin.com/in/mete0rfish/', bgColor: '#e74c3c' },
                { id: 3, name: 'Twitter', link: 'https://twitter.com/mete0rfish', bgColor: '#2ecc71' },
            ]
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
}
</style>
