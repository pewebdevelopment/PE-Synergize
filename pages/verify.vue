<script setup>
import { reactive } from 'vue'
import { Auth } from 'aws-amplify'

definePageMeta({
  middleware: ["auth"]
})



const otp = ref('')
const email = ref('')
const submit = async function () {
    console.log(otp.value)
   try {
    await Auth.confirmSignUp(email.value, otp.value.toString())
    navigateTo('/')
   } catch (error) {
    console.log(error)
   }
}
const resendCode = async function(){
    try {
       const res =  await Auth.resendSignUp(localStorage.email)
       console.log(res)
    } catch (error) {
        console.log(error)
    }
}
onMounted(()=>{
    email.value = localStorage.email
})

</script>

<template>
  <div>
    <NuxtLayout>
      <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
        <CardBox :class="cardClass" is-form @submit.prevent="submit">
          <div class="flex flex-col mt-4 items-center">
            <span>Enter the OTP you received at</span>
            <span class="font-bold">{{email}}</span>
          </div>
          <FormControl
            v-model="otp"
            name="otp"
            type="number"
          />
          <div class="flex justify-center mt-3">
            <BaseButton @click="resendCode" type="button" small="" color="info" label="Resend" />
            </div>

        

          <template #footer>
            <BaseButtons type="justify-center">
              <BaseButton type="submit" color="info" label="Verify" />
            </BaseButtons>
          </template>
        </CardBox>
      </SectionFullScreen>
    </NuxtLayout>
  </div>
</template>
