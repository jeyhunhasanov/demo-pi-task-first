<template>
  <div>
    <v-card>
      <v-card-title class="headline"> İstifadəçilər ({{ paginationTotal }})</v-card-title>
    </v-card>
    <v-divider class="my-5" />
    <v-card elevation="5">
      <v-card-text>
        <v-simple-table dense>
          <template #default>
            <thead>
              <tr>
                <th class="text-left">№</th>
                <th class="text-left">Ad</th>
                <th class="text-left">Email</th>
                <th class="text-left">Cins</th>
                <th class="text-left">Status</th>
                <th class="text-left">Hərəkətlər</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(userItem, userIndex) in users" :key="userIndex">
                <td>
                  {{ (page - 1) * paginationLimit + ++userIndex }}
                </td>
                <td>{{ userItem.name }}</td>
                <td>
                  <a :href="`mailto:${userItem.email}`">{{ userItem.email }}</a>
                </td>
                <td>
                  <span v-if="userItem.gender === enumGenderType.MALE">Kişi</span>
                  <span v-else-if="userItem.gender === enumGenderType.FEMALE">Qadın</span>
                </td>
                <td>
                  <v-chip v-if="userItem.status === enumStatusType.ACTIVE" :color="$colors.green" dark x-small>
                    Aktiv
                  </v-chip>
                  <v-chip v-else-if="userItem.status === enumStatusType.INACTIVE" :color="$colors.red" dark x-small>
                    Passiv
                  </v-chip>
                </td>
                <td>
                  <v-tooltip left>
                    <template #activator="{on, attrs}">
                      <v-btn :color="$colors.green" dark v-bind="attrs" x-small v-on="on">
                        <v-icon small>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Dəyiş</span>
                  </v-tooltip>
                  <v-tooltip right>
                    <template #activator="{on, attrs}">
                      <v-btn :color="$colors.red" dark v-bind="attrs" x-small v-on="on">
                        <v-icon small>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Sil</span>
                  </v-tooltip>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-row v-if="paginationTotal >= paginationLimit" align="center" class="my-5" justify="center">
          <v-col cols="12">
            <v-pagination
              v-model="page"
              :color="$colors.green"
              :length="paginationPages"
              :total-visible="paginationLimit"
            />
          </v-col>
          <v-col cols="2">
            <v-autocomplete
              v-model="page"
              :color="$colors.green"
              :items="paginationPagesNumbers"
              dense
              height="20"
              hide-details
              label="Səhifə"
              no-data-text="Yoxdur"
              outlined
            />
          </v-col>
        </v-row>
      </v-card-text>
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
