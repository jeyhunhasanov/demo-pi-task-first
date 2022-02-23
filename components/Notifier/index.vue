<template>
  <v-snackbar v-model="snackbar" :color="settings.type" :timeout="settings.duration" v-bind="settings.placement">
    <div class="d-flex justify-space-between align-center">
      <div>{{ settings.content }}</div>
      <div>
        <v-btn :ripple="false" icon dark @click="snackbar = false"><v-icon>mdi-close</v-icon></v-btn>
      </div>
    </div>
  </v-snackbar>
</template>

<script lang="ts">
import script from './main'

export default script
</script>

<style lang="scss" scoped>
@import 'style';
</style>
