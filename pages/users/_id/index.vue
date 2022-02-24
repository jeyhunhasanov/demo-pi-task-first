<template>
  <div>
    <div v-if="hasExistingUser">
      <v-card>
        <v-card-title class="headline"> İstifadəçi - {{ requestUserDetails.name }}</v-card-title>
      </v-card>
      <v-card class="mt-5">
        <v-card-text>
          <v-form ref="formValidationUpdate" v-model="formValidationUpdate" lazy-validation>
            <v-row align="center">
              <v-col cols="12" lg="3" md="4" sm="7">
                <v-text-field
                  v-model="requestUserDetails.name"
                  v-input-letter-case="'words'"
                  :color="$colors.green"
                  :rules="[...validations.required]"
                  dense
                  label="Ad"
                  outlined
                  @keyup.enter="btnUpdate()"
                />
                <v-text-field
                  v-model="requestUserDetails.email"
                  v-input-letter-case="'lowercase'"
                  :color="$colors.green"
                  :rules="[...validations.required, ...validations.email]"
                  dense
                  label="Email"
                  outlined
                  @keyup.enter="btnUpdate()"
                />
                <div>Cins</div>
                <v-radio-group v-model="requestUserDetails.gender" :rules="[...validations.required]" dense row>
                  <v-radio :color="$colors.green" :value="null" label="Hamısı" />
                  <v-radio :color="$colors.green" :value="enumGenderType.MALE" label="Kişi" />
                  <v-radio :color="$colors.green" :value="enumGenderType.FEMALE" label="Qadın" />
                </v-radio-group>
                <div>Status</div>
                <v-radio-group v-model="requestUserDetails.status" :rules="[...validations.required]" dense row>
                  <v-radio :color="$colors.green" :value="null" label="Hamısı" />
                  <v-radio :color="$colors.green" :value="enumStatusType.ACTIVE" label="Aktiv" />
                  <v-radio :color="$colors.green" :value="enumStatusType.INACTIVE" label="Passiv" />
                </v-radio-group>
                <v-btn
                  :color="$colors.green"
                  :disabled="!formValidationUpdate"
                  :loading="sendingRequest"
                  class="white--text mt-4"
                  depressed
                  @click="btnUpdate()"
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
      <v-card-title class="headline"> İstifadəçi tapılmadı</v-card-title>
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
