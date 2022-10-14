<script setup>
import { reactive, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { useSnackBarStore } from "@/stores/snackBar";

import {Auth} from 'aws-amplify'
import {
  mdiAccount,
  mdiMail,
  mdiAsterisk,
  mdiFormTextboxPassword,
} from '@mdi/js'
import SnackBar from '~~/components/prem/SnackBar.vue';

definePageMeta({
  middleware: ["auth"]
})

const mainStore = useMainStore()
const snackBarStore = useSnackBarStore();

const profileForm = reactive({
  name: mainStore.userName,
  email: mainStore.userEmail,
})

const passwordForm = reactive({
  password_current: '',
  password: '',
  password_confirmation: '',
})

const submitProfile = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser()
    
    await Auth.updateUserAttributes(user, {
      name: profileForm.name,
      picture: 'https://avatars.dicebear.com/api/avataaars/Nelson-Jerde.svg'
    })
    mainStore.setUser(profileForm)
  useSnackBarStore().pushMessage(
      'Profile Successfully Updated!',
      'success',
      30000
    );
 } catch (error) {
  console.log(error)
 }
}

onMounted(async ()=>{
})

const submitPass = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser()
    await Auth.changePassword(user, passwordForm.password_current, passwordForm.password)
    useSnackBarStore().pushMessage(
      'Password Successfully Updated!',
      'success',
      30000
    );
    passwordForm.password_current  = passwordForm.password_confirmation = passwordForm.password = ''

  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div>
    <NuxtLayout name="zen">
      <SectionMain>
        <SnackBar />
        <div class="grid grid-cols-1 gap-6 lg:w-1/2 mx-auto">
          <SectionTitleLineWithButton
            :icon="mdiAccount"
            title="Manage profile"
          />
          <CardBox is-form @submit.prevent="submitProfile" class="border">
            <FormField label="Avatar" help="Max 500kb">
              <FormFilePicker label="Upload" />
            </FormField>

            <FormField label="Name" help="Required. Your name">
              <FormControl
                v-model="profileForm.name"
                :icon="mdiAccount"
                name="username"
                required
                autocomplete="username"
              />
            </FormField>
            <FormField label="E-mail" help="Required. Your e-mail">
              <FormControl
                v-model="profileForm.email"
                disabled
                :icon="mdiMail"
                type="email"
                name="email"
                required
                autocomplete="email"
              />
            </FormField>

            <template #footer>
              <BaseButtons>
                <BaseButton color="info" type="submit" label="Submit" />
              </BaseButtons>
            </template>
          </CardBox>
          <CardBox is-form @submit.prevent="submitPass" class="border">
            <FormField
              label="Current password"
              help="Required. Your current password"
            >
              <FormControl
                v-model="passwordForm.password_current"
                :icon="mdiAsterisk"
                name="password_current"
                type="password"
                required
                autocomplete="current-password"
              />
            </FormField>

            <BaseDivider />

            <FormField label="New password" help="Required. New password">
              <FormControl
                v-model="passwordForm.password"
                :icon="mdiFormTextboxPassword"
                name="password"
                type="password"
                required
                autocomplete="new-password"
              />
            </FormField>

            <FormField
              label="Confirm password"
              help="Required. New password one more time"
            >
              <FormControl
                v-model="passwordForm.password_confirmation"
                :icon="mdiFormTextboxPassword"
                name="password_confirmation"
                type="password"
                required
                autocomplete="new-password"
              />
            </FormField>
            <span
              class="text-red-600 text-sm"
              v-if="
                passwordForm.password_confirmation &&
                passwordForm.password_confirmation !== passwordForm.password
              "
            >
              New Password and Cofirm password are not same!
            </span>

            <template #footer>
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
              </BaseButtons>
            </template>
          </CardBox>
        </div>
      </SectionMain>
    </NuxtLayout>
  </div>
</template>
