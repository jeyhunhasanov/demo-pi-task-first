<template>
  <div>
    <div v-if="Object.values(userDetails).length">
      <v-card>
        <v-card-title class="headline">
          <strong>{{ userDetails.name }}</strong>
          &nbsp;adlı istifadəçinin məqalələri ({{ paginationTotal }})
          <v-spacer />
          <v-btn
            :color="$colors.green"
            :to="`/users/posts/new?userId=${userDetails.id}`"
            class="my-3 my-sm-0"
            dark
            depressed
          >
            <v-icon class="mr-1">mdi-text-box-plus-outline</v-icon>
            Yeni məqalə
          </v-btn>
        </v-card-title>
      </v-card>
      <v-card class="mt-5">
        <v-card-text>
          <v-form ref="formValidationFilter" @submit="$event.preventDefault()">
            <v-row align="center">
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  v-model="queryParams.title"
                  :color="$colors.green"
                  dense
                  hide-details
                  label="Başlıq"
                  outlined
                  @keyup.enter="btnFilter()"
                />
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-btn
                  :color="$colors.green"
                  :loading="sendingRequest"
                  class="white--text"
                  depressed
                  @click="btnFilter()"
                >
                  <v-icon class="mr-1">mdi-filter-outline</v-icon>
                  Axtar
                </v-btn>
                <v-btn :disabled="!isActiveResetFilterBtn" depressed @click="btnResetFilter()">
                  <v-icon class="mr-1">mdi-filter-remove-outline</v-icon>
                  Təmizlə
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
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
                    {{ (page - 1) * paginationLimit + ++postIndex }}
                  </td>
                  <td>{{ postItem.title }}</td>
                  <td>
                    <v-tooltip left>
                      <template #activator="{on, attrs}">
                        <v-btn
                          :color="$colors.green"
                          :to="`/users/posts/${postItem.id}`"
                          dark
                          depressed
                          v-bind="attrs"
                          x-small
                          v-on="on"
                        >
                          <v-icon small>mdi-pencil-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>Dəyiş</span>
                    </v-tooltip>
                    <v-tooltip right>
                      <template #activator="{on, attrs}">
                        <v-btn
                          :color="$colors.red"
                          dark
                          depressed
                          v-bind="attrs"
                          x-small
                          @click="btnDeletingPost(postItem)"
                          v-on="on"
                        >
                          <v-icon small>mdi-delete-outline</v-icon>
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
          <v-row v-if="paginationTotal >= paginationLimit" align="center" class="my-5" justify="center">
            <v-col cols="12">
              <v-pagination
                v-model="page"
                :color="$colors.green"
                :length="paginationPages"
                :total-visible="paginationLimit"
                @input="changePage"
              />
            </v-col>
            <v-col cols="7" sm="4" md="2">
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
                @change="changePage"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
    <v-card v-else>
      <v-card-title class="headline">İstifadəçi tapılmadı</v-card-title>
    </v-card>
    <!--    Delete user dialog-->
    <v-dialog v-model="dialog.deletePost" max-width="425" width="100%">
      <v-card>
        <v-card-title>
          <v-icon :color="$colors.red" class="mx-auto" size="50">mdi-alert-outline</v-icon>
        </v-card-title>
        <v-card-text>
          <strong>"{{ selectedPost.title }}"</strong>
          adlı məqaləni silmək istədiyinizdən əminsinizmi?
          <div class="mt-7">
            <v-btn depressed @click="dialog.deletePost = false">Xeyr</v-btn>
            <v-btn :color="$colors.red" :loading="sendingRequest" dark depressed @click="btnDeletePost()">Bəli</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import script from './main'

export default script
</script>

<style lang="scss" scoped>
@import 'style';
</style>
