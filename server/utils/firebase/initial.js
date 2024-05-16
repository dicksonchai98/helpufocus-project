import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase/storage'
import { initializeApp as initilFirebaseApp } from 'firebase/app'

import logger from '../logger'

export function initialFirebase(event) {
  try {
    const config = useRuntimeConfig(event)
    const serviceAccount = {
      type: config.firebaseKey.type,
      projectId: config.firebaseKey.projectId,
      privateKeyId: config.firebaseKey.privateKeyId,
      privateKey: config.firebaseKey.privateKey.replace(/\\n/g, "\n"),
      clientEmail: config.firebaseKey.clientEmail,
      clientId: config.firebaseKey.clientId,
      authUri: config.firebaseKey.authUri,
      tokenUri: config.firebaseKey.tokenUri,
      authProviderX509CertUrl: config.firebaseKey.authProviderX509CertUrl,
      clientX509CertUrl: config.firebaseKey.clientX509CertUrl,
      universeDomain: config.firebaseKey.universeDomain,
    }

    initializeApp({ credential: cert(serviceAccount) })
    initilFirebaseApp(config.firebaseStorage)
  } catch (error) {
    logger.error(`${error.stack}`)
  }
}

export function initialFirestore() {
  const firestore = getFirestore()
  return firestore
}

export function initialStorage() {
  const storage = getStorage()
  return storage
}
