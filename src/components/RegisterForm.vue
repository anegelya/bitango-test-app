<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="11" sm="8" md="6">
        <v-card v-if="isRegistered" elevation="6">
          <v-card-title>
            Thank you for registration 🎉!
          </v-card-title>
          <v-card-text>
            <p>Email and SMS are sent.</p>
          </v-card-text>
        </v-card>
        <v-card v-else elevation="6">
          <v-card-title>
            Registration
          </v-card-title>

          <v-card-text>
            <!-- NOTE: Plase note that validation of the form is not included because it wasn't in task description -->
            <v-form @submit.prevent="submit">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.name"
                    name="name"
                    type="text"
                    label="Name"
                    outlined
                    required
                    dense>
                  </v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-autocomplete
                    v-model="user.country_id"
                    :items="countries"
                    item-text="name"
                    item-value="id"
                    name="country_id"
                    label="Country"
                    outlined
                    required
                    dense>
                  </v-autocomplete>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="user.phone"
                    v-mask="'## ###-##-##'"
                    name="phone"
                    type="tel"
                    label="Phone Number"
                    :prefix="country?.idd"
                    :disabled="!country"
                    outlined
                    required
                    dense>
                  </v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="user.email"
                    name="email"
                    type="email"
                    label="Email"
                    outlined
                    required
                    dense>
                  </v-text-field>
                </v-col>

              </v-row>

              <v-row class="mb-10 align-center">
                <v-col cols="12" md="6">
                  <v-btn
                    type="submit"
                    :loading="isLoading">
                     Register
                  </v-btn>
                </v-col>
              </v-row>

            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { apiFactory } from '@/api/apiFactory'

const authApi = apiFactory.get('auth')
const countriesApi = apiFactory.get('countries')

export default {
  data: () => ({
    isLoading: false,
    isRegistered: false,
    countries: [],
    user: {
      name: null,
      email: null,
      country_id: null,
      phone: null,
    },
  }),
  computed: {
    country() {
      if (this.user.country_id) {
        return this.countries.find(({ id }) => id === this.user.country_id)
      }
      return null
    },
  },
  methods: {
    async loadCountries() {
      // TODO: Trycatch is omited because I don't show any error notification for simplicity
      const { data } = await countriesApi.getAll()
      this.countries = data
    },
    
    async submit() {
      // TODO: Validation of payload can be placed here, but it wasn't in task description
      try {
        this.isLoading = true
        await authApi.register(this.user)
        this.isRegistered = true
      // eslint-disable-next-line no-useless-catch
      } catch (error) {
        // TODO: Show errors as notification if needed
        throw error
      } finally {
        this.isLoading = false
      }
    },
  },
  mounted() {
    this.loadCountries()
  },
}
</script>