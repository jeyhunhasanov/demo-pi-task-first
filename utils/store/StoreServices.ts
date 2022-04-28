import {Vue} from 'nuxt-property-decorator'

class StoreServices extends Vue {
  dispatch(type: string, payload: any) {
    this.$nuxt.$store.dispatch(type, payload)
  }
}

export default StoreServices
