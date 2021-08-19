<template>
<div class="relative text-gray-300">
  <div class="relative">
    <div id="menu-background" class="absolute top-0 left-0 z-0 w-full min-h-full bg-gray-800 transition-all duration-500"></div>
    <div class="flex justify-between p-3 mx-auto max-w-screen-md">
      <span id="menu-icon" @click="toggleMenu()" class="material-icons z-10 md:hidden hover:text-white transition-colors">menu</span>
      <router-link to="/" class="z-10 hover:text-white transition-colors"><span class="material-icons">games</span></router-link>
      <router-link v-for="item in architecture" :key="item.name" :to="item.path" class="z-10 hidden hover:text-white md:inline transition-colors">{{ item.name }}</router-link>
      <span style="width: 1.5rem;"></span>
    </div>
  </div>
  <div id="menu-mobile" class="absolute max-h-0 w-full overflow-hidden border-t border-gray-600 px-10 divide-y divide-gray-600 transition-all duration-500">
    <router-link v-for="item in architecture" :key="item.name" :to="item.path" class="block py-2 hover:text-white transition-colors" @click="toggleMenu()">{{ item.name }}</router-link>
  </div>
  
</div>
</template>

<script>
import architecture from '../architecture.js'

export default {
    name: 'Menu',
    setup() {
      const toggleMenu = () => {
        const bg = document.getElementById('menu-background')
        const icon = document.getElementById('menu-icon')
        const mobileMenu = document.getElementById('menu-mobile')

        if (icon.textContent == 'menu') {
          // Open Mobile Menu
          icon.textContent = 'close'

          bg.classList.remove('bg-gray-800')
          bg.classList.add('bg-gray-900')
          bg.classList.remove('min-h-full')
          bg.classList.add('min-h-screen')

          mobileMenu.classList.remove('max-h-0')
        }
        else {
          // Close Mobile Menu
          icon.textContent = 'menu'

          bg.classList.remove('bg-gray-900')
          bg.classList.add('bg-gray-800')
          bg.classList.remove('min-h-screen')
          bg.classList.add('min-h-full')

          mobileMenu.classList.add('max-h-0')
        }
      }

      return {
        toggleMenu,
        architecture
      }
    }
}
</script>

<style>

</style>