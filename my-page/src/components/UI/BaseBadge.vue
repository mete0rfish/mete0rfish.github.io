<template>
    <div>
        <slot></slot>
    </div>
</template>

<script> 
export default {
    props: { // 'defineProps'가 아닌 'props' 옵션 사용
        bgColor: {
            type: String,
            default: '#727272'
        }
    }
}
</script>

<style scoped>
div {
    display: inline-flex;
    padding: 0.25rem 1rem;
    border-radius: 22px;
    background-color: v-bind(bgColor);
    color: white;
}
</style>