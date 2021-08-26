<template>
    <Menu></Menu>
    <h1 class="text-red-500">Home</h1>
    <Footer></Footer>
</template>

<script>
import Menu from '../components/Menu.vue'
import Footer from '../components/Footer.vue'
import { onMounted } from '@vue/runtime-core'

export default {
    name: 'Home',
    components: {
        Menu,
        Footer
    },
    setup() {
        document.title = "Game Tools"
    }
}
</script>

<style>

</style>