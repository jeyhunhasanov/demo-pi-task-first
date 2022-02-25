<template>
  <div>
    <div v-if="Object.values(userDetails).length">
      <v-card>
        <v-card-title class="headline"> Yeni məqalə</v-card-title>
      </v-card>
      <v-card class="mt-5">
        <v-card-text>
          <v-form ref="formValidationCreatePost" v-model="formValidationCreatePost" lazy-validation>
            <v-row align="center">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="requestCreatePost.title"
                  v-input-letter-case
                  :color="$colors.green"
                  :rules="[...validations.required]"
                  dense
                  label="Başlıq"
                  outlined
                  @keyup.enter="btnCreatePost()"
                />
                <v-textarea
                  v-model="requestCreatePost.body"
                  v-input-letter-case
                  :color="$colors.green"
                  :rules="[...validations.required]"
                  dense
                  label="Məqalə"
                  outlined
                  @keyup.enter="btnCreatePost()"
                />
                <v-btn
                  :color="$colors.green"
                  :disabled="!formValidationCreatePost"
                  :loading="sendingRequest"
                  class="white--text mt-4"
                  depressed
                  @click="btnCreatePost()"
                >
                  <v-icon class="mr-1">mdi-check</v-icon>
                  Yadda saxla
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
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
