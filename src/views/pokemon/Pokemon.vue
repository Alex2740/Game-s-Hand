<template>
    <Menu></Menu>
    <header class="text-white py-24 px-4 bg-cover" style="background: url(/img/pokemon/pokemon.gif)">
        <div class="max-w-screen-md mx-auto">
            <h1 class="text-center text-6xl">Pokémon</h1>
            <p class="text-center text-2xl mt-3">Bienvenue dans le monde des Pokémon ! Ce monde est peuplé de créatures mystérieuses appelées Pokémon. Les Pokémon ont tous des pouvoirs, une apparence et un habitat particuliers. Ils vivent en paix avec les humains. Ils se complètent, s’entraident, et il leur arrive même de faire de grandes choses ensemble ! Les combats de Pokémon, par exemple, sont très populaires, et permettent d'approfondir les liens entre un Dresseur et son équipe Pokémon.</p>
        </div>
    </header>
    <Container>
        <Section>
            <SectionTitle>Pokémon Epée & Bouclier</SectionTitle>
            <p class="text-lg mt-4">Bienvenue dans la région de Galar !</p>
            <img class="mt-4 rounded-lg" src="/img/pokemon/pokemon-swsh.jpg" alt="Pokémon Epée & Bouclier">
            <div class="mt-4 grid grid-cols-3 gap-4">
                <Card class="col-span-full md:col-span-1 md:col-start-2 bg-cover bg-bottom mt-4" style="background-image: url(/img/pokemon/expedition-dynamax.jpg)">
                    <div class="bg-black py-5 bg-opacity-50 text-white">
                        <CardTitle class="">Expédition Dynamax</CardTitle>
                        <p class="mx-5">Lors des expéditions Dynamax, vous ferez équipe avec trois autres Dresseurs pour explorer les antres de Pokémon où se cachent des Pokémon Dynamax !</p>
                        <div class="flex mt-3 justify-center">
                            <router-link class="bg-blue-500 px-5 py-3 rounded-xl align-middle" to="/pokemon/swsh-expedition">Explorer</router-link>
                        </div>
                    </div>
                </Card>
            </div>
        </Section>
    </Container>
    <Footer></Footer>
</template>

<script>
import Menu from '../../components/Menu.vue'
import Footer from '../../components/Footer.vue'
import Card from '../../components/Card.vue'
import CardTitle from '../../components/CardTitle.vue'
import SectionTitle from '../../components/SectionTitle.vue'
import Section from '../../components/Section.vue'
import Container from '../../components/Container.vue'

export default {
    name: 'Pokemon',
    components: {
        Menu,
        Footer,
        Card,
        CardTitle,
        SectionTitle,
        Section,
        Container
    },
    setup() {
        document.title = "Pokémon - Game Tools"
    }
}
</script>

<style>

</style>