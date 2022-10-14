import { Auth } from "aws-amplify"
import { useMainStore } from '@/stores/main.js'

const store = useMainStore()
export default defineNuxtRouteMiddleware(async (to, from) => {
  if(!store.isAuthenticated){
    try {
      const user = await Auth.currentAuthenticatedUser()
      if(user){
        store.setUser({
          name: user.attributes.name,
          email: user.attributes.email,
          avatar:
          user.attributes.picture || 'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93',
        })
      }
      
    } catch (error) {
      console.log(error)
      navigateTo('/')
    }
  }
  
  
  // if (to.params.id === '1') {
  //   return abortNavigation()
  // }
  // return navigateTo('/')
})