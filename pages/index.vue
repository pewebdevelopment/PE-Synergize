<script setup>
import { reactive } from 'vue'
import { Auth } from 'aws-amplify'

import { mdiAccount, mdiAsterisk } from '@mdi/js'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/stores/main.js'

const store = useMainStore()

definePageMeta({
  middleware: ['auth'],
})

const form = reactive({
  login: 'rbpepeosjjfuvuo@spacehotline.com',
  pass: 'Password1122',
  remember: true,
})
const error_message = ref('')

onMounted(async () => {
  try {
    const user = await Auth.currentAuthenticatedUser()
    store.setUser({
      name: user.attributes.name,
      email: user.attributes.email,
      avatar:
        user.attributes.picture || 'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93',
    })
    console.log(user.attributes)
    if (user) navigateTo('/dashboard')
  } catch (error) {
    console.log(error.response)
  }
})
const submit = async () => {
  error_message.value = ''
  try {
    await Auth.signIn(form.login, form.pass)
    navigateTo('/dashboard')
  } catch (error) {
    error_message.value = error.message
  }

  // router.push("/dashboard");
}
const signinWithGoogle = async () => {
  try {
    Auth.federatedSignIn({ provider: 'Google' })
  } catch (error) {
    console.log('error:', error)
  }
}
</script>

<template>
  <div>
    <NuxtLayout>
      <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
        <CardBox :class="cardClass" is-form @submit.prevent="submit">
          <div class="flex justify-center gap-4">
            <button
              type="button"
              class="btn-facebook text-white px-3 py-2 border-2 border-gray-400 focus:ring-4 focus:outline-none f font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
            >
              <svg
                class="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="facebook-f"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
                ></path>
              </svg>
              Sign in with Facebook
            </button>
            <button
              @click="signinWithGoogle"
              type="button"
              class="btn-google text-white px-3 py-2 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            >
              <svg
                class="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with Google
            </button>
          </div>
          <div class="flex justify-center">
            <p class="text-base uppercase">Or</p>
          </div>
          <FormField label="Login" help="Please enter your login">
            <FormControl
              v-model="form.login"
              :icon="mdiAccount"
              name="login"
              autocomplete="username"
            />
          </FormField>

          <FormField label="Password" help="Please enter your password">
            <FormControl
              v-model="form.pass"
              :icon="mdiAsterisk"
              type="password"
              name="password"
              autocomplete="current-password"
            />
              
          </FormField>
           

          <FormCheckRadio
            v-model="form.remember"
            name="remember"
            label="Remember"
            :input-value="true"
          />

          <template #footer>
              <p class="text-red-500 mb-3">{{error_message}}</p>
            <BaseButtons>
              <BaseButton type="submit" color="info" label="Login" />
            </BaseButtons>
             <div class="flex justify-end">
              <nuxt-link to="/forgot" class="text-blue-500 underline"
                >Forgot Password?</nuxt-link
              ></div>
            <p>
              Does not have an account?
              <nuxt-link to="/register" class="text-blue-500 underline"
                >Register</nuxt-link
              >
            </p>
          </template>
        </CardBox>
      </SectionFullScreen>
    </NuxtLayout>
  </div>
</template>

<style scope>
.btn-facebook {
  background-color: #3b5998;
}
.btn-facebook:hover {
  background-color: rgba(59, 89, 152, 0.9);
}
.btn-google {
  background-color: #4285f4;
}
.btn-google:hover {
  background-color: rgba(66, 133, 244, 0.9);
}
</style>
