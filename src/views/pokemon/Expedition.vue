<template>
    <div class="grid grid-cols-12 gap-4 p-4">
        <Card class="flex justify-center items-center col-span-9 md:col-span-4 md:order-1 lg:col-span-2 lg:col-start-3">
            <h1 class="text-xl">Expédition Dynamax</h1>
        </Card>
        <Card class="flex items-center justify-center col-span-3 md:order-3 md:col-span-2 lg:col-span-1 lg:col-start-10">
            <router-link to="/pokemon" class="flex justify-center">
                <span class="material-icons align-middle">close</span>
            </router-link>
        </Card>
        <Card class="col-span-full md:order-2 md:col-span-6 lg:col-span-3 lg:col-start-6">
            <CardTitle>Paramètres</CardTitle>
            <div class="flex flex-row items-center justify-between">
                <div class="flex items-center gap-2">
                    <label for="chimeres">Ultra-Chimères</label>
                    <input type="checkbox" name="chimeres" id="chimeres" @change="getTypes()">
                </div>
                <div class="flex items-center gap-2">
                    <label from="game">Jeu :</label>
                    <select name="game" id="game" @change="getTypes()">
                        <option value="epee">Epée</option>
                        <option value="bouclier">Bouclier</option>
                        <option value="all">Les Deux</option>
                    </select>
                </div>
            </div>
        </Card>
        <Card class="col-span-full md:order-4">
            <span class="float-right bg-gray-400 text-white rounded-full material-icons p-1 relative -top-1" @click="getPokemons()">loop</span>
            <CardTitle>Types Possibles</CardTitle>
            <div id="types" class="grid grid-cols-8 gap-1 md:grid-cols-12 lg:grid-cols-17">
                <img :id="type" class="rounded-full border-blue-500" v-for="type in typesAvailable" :key="type" @click="getPokemons(type)" :src="imgType(type)" :alt="type">
            </div>
        </Card>
        <Card class="col-span-full  md:col-span-4 md:order-5 lg:col-span-6">
            <span id="reset-pokemon" class="float-right bg-gray-400 text-white rounded-full material-icons p-1 relative -top-1" @click="resetPokemons()">loop</span>
            <CardTitle>Légendaires Possibles</CardTitle>
            <div id="legendaires" class="grid grid-cols-6 gap-1 md:grid-cols-4 lg:grid-cols-8">
                <img :id="pokemon.nom" class="rounded-full border-blue-500" v-for="pokemon in pokemonsAvailable" :key="pokemon.id" :src="imgPokemon(pokemon.id)" :alt="pokemon.nom" @click="setPokemon(pokemon)">
            </div>
        </Card>
        <Card class="col-span-full  md:col-span-4 md:order-6 lg:col-span-3">
            <CardTitle class="text-red-500">Meilleurs Types Offensifs</CardTitle>
            <div class="flex flex-col gap-1">
                <div class="flex items-start gap-1" v-for="type in offensifTypes" :key="type.nom">
                    <img class="h-7" :src="imgType(type.nom)" :alt="type.nom">
                    <div>{{ type.nom }} : {{ roundPrecision(type.value, 2) }}</div>
                </div>
            </div>
        </Card>
        <Card class="col-span-full  md:col-span-4 md:order-7 lg:col-span-3">
            <CardTitle class="text-blue-500">Meilleurs Types Défensifs</CardTitle>
            <div class="flex flex-col gap-1">
                <div class="flex items-start gap-1" v-for="type in defensifTypes" :key="type.nom">
                    <img class="h-7" :src="imgType(type.nom)" :alt="type.nom">
                    <div>{{ type.nom }} : {{ roundPrecision(type.value, 2) }}</div>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
import legendaires from '../../assets/pokemon/legendaires.js'
import chimeres from '../../assets/pokemon/chimeres.js'
import tableTypes from '../../assets/pokemon/table-types.js'
import { onMounted, ref } from '@vue/runtime-core'
import Card from '../../components/Card.vue'
import CardTitle from '../../components/CardTitle.vue'

export default {
    name: "Expédition Dynamax",
    components: {
        Card,
        CardTitle
    },
    setup() {
        document.title = "Expédition Dynamax - Game Tools"
        let typesAvailable = ref([])
        let pokemonsAvailable = ref([])
        let offensifTypes = ref([])
        let defensifTypes = ref([])
        const imgPokemon = (id) => {
            return '/img/pokemon/icons/' + id + '.png'
        }

        const imgType = (type) => {
            return '/img/pokemon/types/' + type + '.png'
        }

        const getTypes = () => {
            typesAvailable.value = []
            const chimeresAvailable = document.getElementById('chimeres').checked
            let game = document.getElementById('game').value

            legendaires.forEach((pokemon) => {
                if (pokemon.nom == "Necrozma*" & !chimeresAvailable) {
                    return
                }

                if (game == 'epee' & pokemon.nom.includes('Bouclier')) {
                    return
                }

                if (game == 'bouclier' & pokemon.nom.includes('Épée')) {
                    return
                }

                pokemon.types.forEach((type) => {
                    if (typesAvailable.value.indexOf(type) == -1) {
                        typesAvailable.value.push(type)
                    }
                })
            })

            if (chimeresAvailable) {
                chimeres.forEach((pokemon) => {
                    pokemon.types.forEach((type) => {
                        if (typesAvailable.value.indexOf(type) == -1) {
                            typesAvailable.value.push(type)
                        }
                    })
                })
            }

            typesAvailable.value.sort()

            getPokemons()
        }

        const getPokemons = (type) => {
            if (type == undefined) {
                type = ''
            }
            let typeIcon = document.getElementById(type)
            let children = document.getElementById('types').children
            document.getElementById('reset-pokemon').setAttribute('type', type)

            for (let i = 0; i < children.length; i++) {
                children[i].classList.remove('border-2')
            }

            if (typeIcon != null) {
                typeIcon.classList.add('border-2')
            }

            pokemonsAvailable.value = []

            pokemonsAvailable.value = []
            const chimeresAvailable = document.getElementById('chimeres').checked
            let game = document.getElementById('game').value

            legendaires.forEach((pokemon) => {                
                if (pokemon.nom == "Necrozma*" & !chimeresAvailable) {
                    return
                }

                if (game == 'epee' & pokemon.nom.includes('Bouclier')) {
                    return
                }

                if (game == 'bouclier' & pokemon.nom.includes('Épée')) {
                    return
                }

                let available = false

                pokemon.types.forEach((el) => {
                    available = available || el.includes(type)
                })

                if (available) {
                    pokemonsAvailable.value.push(pokemon)
                }
            })

            if (chimeresAvailable) {
                chimeres.forEach((pokemon) => {
                    let available = false

                    pokemon.types.forEach((el) => {
                        available = available || el.includes(type)
                    })

                    if (available) {
                        pokemonsAvailable.value.push(pokemon)
                    }
                })
            }

            getResults()
        }

        const resetPokemons = () => {
            let type = document.getElementById('reset-pokemon').getAttribute('type')

            if (type == undefined) {
                getPokemons()
            }
            else {
                getPokemons(type)
            }
        }

        const getResults = () => {
            offensifTypes.value = []
            defensifTypes.value = []
            let offensifTypesJson = {
                acier: 0,
                combat: 0,
                dragon: 0,
                eau: 0,
                electrik: 0,
                fee: 0,
                feu: 0,
                glace: 0,
                insecte: 0,
                normal: 0,
                plante: 0,
                poison: 0,
                psy: 0,
                roche: 0,
                sol: 0,
                spectre: 0,
                tenebres: 0,
                vol: 0,
            }

            let defensifTypesJson = {
                acier: 0,
                combat: 0,
                dragon: 0,
                eau: 0,
                electrik: 0,
                fee: 0,
                feu: 0,
                glace: 0,
                insecte: 0,
                normal: 0,
                plante: 0,
                poison: 0,
                psy: 0,
                roche: 0,
                sol: 0,
                spectre: 0,
                tenebres: 0,
                vol: 0,
            }

            let numberAttack = 0

            pokemonsAvailable.value.forEach((pokemon) => {
                // Offensif
                let weak = getWeakness(pokemon)
                Object.keys(weak).forEach((el) => {
                    offensifTypesJson[el] += weak[el]
                })

                // Defensif
                pokemon.attaques.forEach((atk) => {
                    if (atk == null) {
                        return
                    }
                    let efficiency = getEfficiency(atk.type)

                    Object.keys(efficiency).forEach((el) => {
                        defensifTypesJson[el] += efficiency[el]
                    })

                    numberAttack++
                })
            })

            Object.keys(offensifTypesJson).forEach((el) => {
                offensifTypesJson[el] /= pokemonsAvailable.value.length

                offensifTypes.value.push({
                    nom: el,
                    value: offensifTypesJson[el]

                })
            })

            Object.keys(defensifTypesJson).forEach((el) => {
                defensifTypesJson[el] /= numberAttack

                defensifTypes.value.push({
                    nom: el,
                    value: defensifTypesJson[el]

                })
            })

            offensifTypes.value.sort((a, b) => b.value - a.value)
            defensifTypes.value.sort((a, b) => a.value - b.value)

            //offensifTypes.value = offensifTypes.value.splice(0, 5)
            //defensifTypes.value = defensifTypes.value.splice(0, 5)
        }

        const getWeakness = (pokemon) => {
            let weakness = {
                acier: 1,
                combat: 1,
                dragon: 1,
                eau: 1,
                electrik: 1,
                fee: 1,
                feu: 1,
                glace: 1,
                insecte: 1,
                normal: 1,
                plante: 1,
                poison: 1,
                psy: 1,
                roche: 1,
                sol: 1,
                spectre: 1,
                tenebres: 1,
                vol: 1,
            }

            pokemon.types.forEach((type) => {
                Object.keys(tableTypes[type]).forEach((el) => {
                    weakness[el] *= tableTypes[type][el]
                })
            })

            return weakness
        }

        let getEfficiency = (type) => {
            let efficiency = {}

            Object.keys(tableTypes).forEach((el) => {
                efficiency[el] = tableTypes[el][type]
            })

            return efficiency
        }

        const roundPrecision = (nombre, precision) => {
            var precision = precision || 2;
	        var tmp = Math.pow(10, precision);
	        return Math.round( nombre*tmp )/tmp;
        }

        const setPokemon = (pokemon) => {
            pokemonsAvailable.value = [pokemon]

            getResults()
        }

        onMounted(getTypes)

        return {
            getTypes,
            typesAvailable,
            pokemonsAvailable,
            getPokemons,
            getResults,
            offensifTypes,
            roundPrecision,
            defensifTypes,
            setPokemon,
            imgPokemon,
            imgType,
            resetPokemons
        }
    }
}
</script>

<style>

</style>