import {Component, Provide, Vue} from 'nuxt-property-decorator'
// Regex
import {REGEX_ALLOW_LETTERS, REGEX_ALLOW_EMAIL} from '~/constants/regex'
// Models
import {Validations} from '~/models/validations/Validations'
// Validation keys
import {EMAIL, ALPHABET, REQUIRED} from '~/constants/validations'

@Component
class ValidationsMixin extends Vue {
  // region Provide

  @Provide() validations: Validations = {
    alphabet: [
      (value: any) => {
        if (value) {
          return REGEX_ALLOW_LETTERS.test(value) || ALPHABET
        } else {
          return true
        }
      }
    ],
    email: [
      (value: any) => {
        if (value) {
          return REGEX_ALLOW_EMAIL.test(value) || EMAIL
        } else {
          return true
        }
      }
    ],
    required: [
      (value: any) => {
        if (value && typeof value === 'object') {
          return !!value.length || REQUIRED
        }
        return !!value || REQUIRED
      }
    ]
  }

  // endregion
}

export default ValidationsMixin
