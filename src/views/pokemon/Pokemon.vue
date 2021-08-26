<template>
    <Menu></Menu>
    <h1>Pokémon</h1>
    <h2>Epée & Bouclier</h2>
    <router-link to="/pokemon/swsh-expedition">Expédition Dynamax</router-link>
    <Footer></Footer>
</template>

<script>
import Menu from '../../components/Menu.vue'
import Footer from '../../components/Footer.vue'

export default {
    name: 'Pokemon',
    components: {
        Menu,
        Footer
    },
    setup() {
        document.title = "Pokémon - Game Tools"
    }
}
</script>

<style>

</style>