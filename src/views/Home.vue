<template>
    <Menu></Menu>
    <h1 class="text-red-500">Home</h1>
    <Footer></Footer>
</template>

<script>
import Menu from '../components/Menu.vue'
import Footer from '../components/Footer.vue'

export default {
    name: 'Home',
    components: {
        Menu,
        Footer
    }
}
</script>

<style>

</style>