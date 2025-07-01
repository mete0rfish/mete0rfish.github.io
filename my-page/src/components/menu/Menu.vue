<template>
    <li>
        <base-badge :bgColor="bgColor">
            <a :href="link">{{ name }}</a>
        </base-badge>
    </li>
</template>

<script>
export default {
    name: 'menu-component',
    props: ['name', 'link', 'bgColor'],
}
</script>

<style scoped>

li {
  float: left;
  margin-right: 10px;
}

li:first-child:before {
  width: 1px;
  height: 20px;
  background-color: #000000;
  margin-top: 7px;
}
 
li:after {
  width: 1px;
  height: 20px;
  background-color: #000000;
  margin-top: 7px;
}
</style>
