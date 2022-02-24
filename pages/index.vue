<template>
  <div>
    <v-card>
      <v-card-title class="headline">
        İstifadəçilər ({{ paginationTotal }})
        <v-spacer />
        <v-btn :color="$colors.green" dark depressed @click="dialog.createUser = true">
          <v-icon class="mr-1">mdi-account-plus-outline</v-icon>
          Yeni istifadəçi
        </v-btn>
        <!--    Create user dialog-->
        <v-dialog v-model="dialog.createUser" max-width="400" width="100%">
          <v-card>
            <v-card-title>
              Yeni istifadəçi
              <v-spacer />
              <v-btn depressed icon @click="dialog.createUser = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-form
                ref="formValidationCreateUser"
                v-model="formValidationCreateUser"
                class="formValidationCreateUser"
                lazy-validation
              >
                <v-text-field
                  v-model="requestCreateUser.name"
                  :color="$colors.green"
                  :rules="[...validations.required]"
                  dense
                  label="Ad"
                  outlined
                />
                <v-text-field
                  v-model="requestCreateUser.email"
                  :color="$colors.green"
                  :rules="[...validations.required, ...validations.email]"
                  dense
                  label="Email"
                  outlined
                />
                <div>Cins</div>
                <v-radio-group v-model="requestCreateUser.gender" :rules="[...validations.required]" dense row>
                  <v-radio :color="$colors.green" :value="enumGenderType.MALE" label="Kişi" />
                  <v-radio :color="$colors.green" :value="enumGenderType.FEMALE" label="Qadın" />
                </v-radio-group>
                <div>Status</div>
                <v-radio-group v-model="requestCreateUser.status" :rules="[...validations.required]" dense row>
                  <v-radio :color="$colors.green" :value="enumStatusType.ACTIVE" label="Aktiv" />
                  <v-radio :color="$colors.green" :value="enumStatusType.INACTIVE" label="Passiv" />
                </v-radio-group>
                <div class="text-right">
                  <v-btn
                    :color="$colors.green"
                    :disabled="!formValidationCreateUser"
                    :loading="sendingRequest"
                    class="white--text"
                    depressed
                    @click="btnCreateUser()"
                  >
                    Əlavə et
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card-title>
    </v-card>
    <v-card class="mt-5">
      <v-card-text>
        <v-form ref="formValidationFilter">
          <v-row align="center">
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="queryParams.name"
                :color="$colors.green"
                dense
                hide-details
                label="Ad"
                outlined
                @keyup.enter="btnFilter()"
              />
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="queryParams.email"
                :color="$colors.green"
                dense
                hide-details
                label="Email"
                outlined
                @keyup.enter="btnFilter()"
              />
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <div>Cins</div>
              <v-radio-group v-model="queryParams.gender" dense hide-details row>
                <v-radio :color="$colors.green" :value="null" label="Hamısı" />
                <v-radio :color="$colors.green" :value="enumGenderType.MALE" label="Kişi" />
                <v-radio :color="$colors.green" :value="enumGenderType.FEMALE" label="Qadın" />
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <div>Status</div>
              <v-radio-group v-model="queryParams.status" dense hide-details row>
                <v-radio :color="$colors.green" :value="null" label="Hamısı" />
                <v-radio :color="$colors.green" :value="enumStatusType.ACTIVE" label="Aktiv" />
                <v-radio :color="$colors.green" :value="enumStatusType.INACTIVE" label="Passiv" />
              </v-radio-group>
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
                <th class="text-left">Ad</th>
                <th class="text-left">Email</th>
                <th class="text-left">Cins</th>
                <th class="text-left">Status</th>
                <th class="text-left">Hərəkətlər</th>
              </tr>
            </thead>
            <tbody v-if="users.length">
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
                      <v-btn
                        :color="$colors.green"
                        :to="`/users/${userItem.id}`"
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
                        @click="btnDeletingUser(userItem)"
                        v-on="on"
                      >
                        <v-icon small>mdi-delete-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Sil</span>
                  </v-tooltip>
                  <v-tooltip right>
                    <template #activator="{on, attrs}">
                      <v-btn
                        :color="$colors.blue"
                        :to="`/users/posts?userId=${userItem.id}`"
                        dark
                        depressed
                        v-bind="attrs"
                        x-small
                        v-on="on"
                      >
                        <v-icon small>mdi-text-box-multiple-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Məqalələr</span>
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
              @change="changePage"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!--    Delete user dialog-->
    <v-dialog v-model="dialog.deleteUser" max-width="425" width="100%">
      <v-card>
        <v-card-title>
          <v-icon :color="$colors.red" class="mx-auto" size="50">mdi-alert-outline</v-icon>
        </v-card-title>
        <v-card-text>
          Ad: <strong>{{ selectedUser.name }}</strong> <br />
          Email: <strong>{{ selectedUser.email }}</strong> <br />
          istifadəçini silmək istədiyinizdən əminsinizmi?
          <div class="mt-7">
            <v-btn depressed @click="dialog.deleteUser = false">Xeyr</v-btn>
            <v-btn :color="$colors.red" :loading="sendingRequest" dark depressed @click="btnDeleteUser()">Bəli</v-btn>
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
