<template>
  <div>
    <div v-if="requestUpdatePost.title">
      <v-card>
        <v-card-title class="headline"> Məqalə - {{ requestUpdatePost.title }}</v-card-title>
      </v-card>
      <v-card class="mt-5">
        <v-card-text>
          <v-form ref="formValidationUpdatePost" v-model="formValidationUpdatePost" lazy-validation>
            <v-row align="center">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="requestUpdatePost.title"
                  v-input-letter-case
                  :color="$colors.green"
                  :rules="[...validations.required]"
                  :value="1"
                  dense
                  label="Başlıq"
                  outlined
                  @keyup.enter="btnUpdatePost()"
                />
                <v-textarea
                  v-model="requestUpdatePost.body"
                  v-input-letter-case
                  :color="$colors.green"
                  :rules="[...validations.required]"
                  dense
                  label="Məqalə"
                  outlined
                  @keyup.enter="btnUpdatePost()"
                />
                <v-btn
                  :color="$colors.green"
                  :disabled="!formValidationUpdatePost"
                  :loading="sendingRequest"
                  class="white--text mt-4"
                  depressed
                  @click="btnUpdatePost()"
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
      <v-card-title class="headline"> Məqalə tapılmadı</v-card-title>
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
