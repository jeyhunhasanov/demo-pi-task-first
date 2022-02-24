<template>
  <div>
    <div v-if="Object.values(requestPostDetails).length">
      <v-card>
        <v-card-title class="headline"> Məqalə - {{ requestPostDetails.title }}</v-card-title>
      </v-card>
      <v-card class="mt-5">
        <v-card-text>
          <v-form ref="formValidationUpdate" v-model="formValidationUpdate" lazy-validation>
            <v-row align="center">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="requestPostDetails.title"
                  :color="$colors.green"
                  :rules="[...validations.required]"
                  dense
                  :value="1"
                  label="Başlıq"
                  outlined
                  @keyup.enter="btnUpdate()"
                />
                <v-textarea
                  v-model="requestPostDetails.body"
                  :color="$colors.green"
                  :rules="[...validations.required]"
                  dense
                  label="Məqalə"
                  outlined
                  @keyup.enter="btnUpdate()"
                />
                <v-btn
                  :color="$colors.green"
                  :disabled="!formValidationUpdate"
                  :loading="sendingRequest"
                  class="white--text mt-4"
                  depressed
                  @click="btnUpdate()"
                >
                  <v-icon class="mr-1">mdi-content-save-outline</v-icon>
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
