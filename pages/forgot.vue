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

const email = ref('')
const code = ref('')
const password = ref('')

const emailSent = ref(false)


const submit = async () => {
  try {
    const res = await Auth.forgotPassword(email.value)
    emailSent.value = true
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

const changePassword = async () =>{
    try {
    const res = await Auth.forgotPasswordSubmit(email.value, code.value,password.value )
    navigateTo('/')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div>
    <NuxtLayout>
      <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
        <CardBox :class="cardClass" is-form @submit.prevent="submit" v-if="!emailSent">
        
          <FormField label="Forgot" help="Please enter your email">
            <FormControl
              v-model="email"
              :icon="mdiAccount"
              name="login"
              autocomplete="username"
            />
          </FormField>

         
          <template #footer>
            <BaseButtons>
              <BaseButton type="submit" color="info" label="Send" />
            </BaseButtons>
             
          </template>
        </CardBox>
        <CardBox :class="cardClass" is-form @submit.prevent="changePassword" v-else>
        
            <FormField label="OTP" :help="'Please enter otp received at' + email ">
          <FormControl
            v-model="code"
            :icon="mdiAsterisk"
            name="otp"
            autocomplete="off"
          />
        </FormField>
        <FormField label="New Passord" help="Please enter new password">
          <FormControl
            v-model="password"
            :icon="mdiAsterisk"
            name="new-password"
            type="password"
            autocomplete="new-password"
          />
        </FormField>

       
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Submit" />
          </BaseButtons>
           
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
