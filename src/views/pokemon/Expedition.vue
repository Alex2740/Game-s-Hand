<template>
    <h1>Settings</h1>
    <div>
        <label for="chimeres">Chimères</label>
        <input type="checkbox" name="chimeres" id="chimeres" @click="getTypes()">
    </div>
    <div>
        <input type="radio" name="game" id="game-epee" value="epee" checked @click="getTypes()">
        <label for="game-epee">Epée</label>
        <input type="radio" name="game" id="game-bouclier" value="bouclier" @click="getTypes()">
        <label for="game-bouclier">Bouclier</label>
        <input type="radio" name="game" id="game-all" value="all" @click="getTypes()">
        <label for="game-all">Les Deux</label>
    </div>
    <h1>Types Possiles</h1>
    <div class="grid grid-cols-8">
        <img v-for="type in typesAvailable" :key="type" @click="getPokemons(type)" :src="imgType(type)" :alt="type">
    </div>
    <h1>Pokémons Possibles</h1>
    <div class="grid grid-cols-6">
        <img v-for="pokemon in pokemonsAvailable" :key="pokemon.id" :src="imgPokemon(pokemon.id)" :alt="pokemon.nom" @click="setPokemon(pokemon)">
    </div>
    <div class="grid grid-cols-2">
        <div>
            <h1>Meilleurs Types Offensifs</h1>
            <div v-for="type in offensifTypes" :key="type.nom">{{ type.nom }} : {{ roundPrecision(type.value, 2) }}</div>
        </div>
        <div>
            <h1>Meilleurs Types Déffensifs</h1>
            <div v-for="type in defensifTypes" :key="type.nom">{{ type.nom }} : {{ roundPrecision(type.value, 2) }}</div>
        </div>
    </div>
</template>

<script>
import legendaires from '../../assets/pokemon/legendaires.js'
import chimeres from '../../assets/pokemon/chimeres.js'
import tableTypes from '../../assets/pokemon/table-types.js'
import { onMounted, ref } from '@vue/runtime-core'

export default {
    name: "Expédition Dynamax",
    setup() {
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
            let game = ''
            document.getElementsByName('game').forEach((el) => {
                if (el.checked) {
                    game = el.value
                }
            })

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

            getPokemons()
        }

        const getPokemons = (type) => {
            pokemonsAvailable.value = []
            if (type == undefined) {
                type = ''
            }

            pokemonsAvailable.value = []
            const chimeresAvailable = document.getElementById('chimeres').checked
            let game = ''
            document.getElementsByName('game').forEach((el) => {
                if (el.checked) {
                    game = el.value
                }
            })

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
            imgType
        }
    }
}
</script>

<style>

</style>