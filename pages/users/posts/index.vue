<template>
  <div>
    <div v-if="Object.values(userDetails).length">
      <v-card>
        <v-card-title class="headline">
          <strong>{{ userDetails.name }}</strong>
          &nbsp;adlı istifadəçinin məqalələri
        </v-card-title>
      </v-card>
      <v-divider class="my-5" />
      <v-card elevation="5">
        <v-card-text>
          <v-simple-table dense>
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">№</th>
                  <th class="text-left">Başlıq</th>
                  <th class="text-left">Hərəkətlər</th>
                </tr>
              </thead>
              <tbody v-if="posts.length">
                <tr v-for="(postItem, postIndex) in posts" :key="postIndex">
                  <td>
                    {{ ++postIndex }}
                  </td>
                  <td>{{ postItem.title }}</td>
                  <td>
                    <v-tooltip left>
                      <template #activator="{on, attrs}">
                        <v-btn :color="$colors.green" dark depressed v-bind="attrs" x-small v-on="on">
                          <v-icon small>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Dəyiş</span>
                    </v-tooltip>
                    <v-tooltip right>
                      <template #activator="{on, attrs}">
                        <v-btn :color="$colors.red" dark depressed v-bind="attrs" x-small v-on="on">
                          <v-icon small>mdi-delete</v-icon>
                        </v-btn>
                      </template>
                      <span>Sil</span>
                    </v-tooltip>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td class="text-center" colspan="6">Məlumat yoxdur.</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </div>
    <v-card v-else>
      <v-card-title class="headline">İstifadəçi tapılmadı</v-card-title>
    </v-card>
  </div>
</template>

<script lang="ts">
import script from './main'

export default script
</script>

<style lang="scss" scoped>
@import 'style';
</style>
