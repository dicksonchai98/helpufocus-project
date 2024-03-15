import { initialFirebase } from '../utils/firebase/initial'

export default defineNitroPlugin(() => {
  initialFirebase()
})
