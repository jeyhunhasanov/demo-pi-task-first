<template>
  <v-app>
    <v-navigation-drawer :color="$colors.green" app dark clipped>
      <v-list>
        <v-list-item v-for="(menuItem, menuIndex) in menuItems" :key="menuIndex" :to="menuItem.to" exact router>
          <v-list-item-action>
            <v-icon>{{ menuItem.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="menuItem.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :color="$colors.blue" app dark clipped-left>
      <span class="title">Demo first task</span>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
      <Notifier />
    </v-main>
    <v-footer :color="$colors.blue" app dark>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import {Component, Provide, Vue} from 'nuxt-property-decorator'
// Components
import Notifier from '@/components/Notifier/index.vue'

@Component({
  components: {Notifier}
})
class LayoutDashboard extends Vue {
  // region Provide

  @Provide() menuItems: any = [
    {
      icon: 'mdi-account-group',
      title: 'İstifadəçilər',
      to: '/'
    }
  ]

  // endregion
}

export default LayoutDashboard
</script>
