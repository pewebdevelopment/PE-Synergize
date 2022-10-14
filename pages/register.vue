<script setup>
import { reactive } from 'vue'
import { Auth } from 'aws-amplify'

import { mdiAccount, mdiAsterisk } from '@mdi/js'
import { useRouter } from 'vue-router'
import NotificationBar from '@/components/NotificationBar.vue'
import { mdiCheckCircle } from '@mdi/js'

definePageMeta({
  middleware: ['auth'],
})

const form = reactive({
  name: 'Afzaal',
  login: 'jktkfrhz@spacehotline.com',
  pass: 'Password1122',
  remember: true,
})

const verificationSent = ref(false)
const submit = async () => {
  console.log(form.login)
  try {
    console.log(form.login,form.pass,form.name, form.login.split('@')[0])
      
    let response = await Auth.signUp({
      email: form.login,
      password: form.pass,
      username: form.login,
      attributes: {
        name: form.name,
        picture: ''
      },
    })
    localStorage.email = form.login
    console.log(response)
    navigateTo('/verify')
    verificationSent.value = true
  } catch (error) {
    console.log('error:', error)
  }

  // router.push("/dashboard");
}
</script>

<template>
  <div>
    <NuxtLayout>
      <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
        <CardBox :class="cardClass" is-form @submit.prevent="submit">
          <FormField label="Name">
            <FormControl
              v-model="form.name"
              :icon="mdiAccount"
              name="name"
              autocomplete="name"
            />
          </FormField>
          <FormField label="Email" help="Please enter your email">
            <FormControl
              v-model="form.login"
              :icon="mdiAccount"
              name="login"
              autocomplete="email"
            />
          </FormField>

          <FormField label="Password" help="Please enter your password">
            <FormControl
              v-model="form.pass"
              :icon="mdiAsterisk"
              type="password"
              name="password"
              autocomplete="new-password"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton type="submit" color="info" label="Register" />
            </BaseButtons>
            <p>
              Already have an account?
              <nuxt-link to="/" class="text-blue-500 underline"
                >Login</nuxt-link
              >
            </p>
            <br />
            <NotificationBar
              v-if="verificationSent"
              color="success"
              :icon="mdiCheckCircle"
            >
              A Verification Email has been sent to your email!
            </NotificationBar>
          </template>
        </CardBox>
      </SectionFullScreen>
    </NuxtLayout>
  </div>
</template>
