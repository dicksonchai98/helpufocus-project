import fs from 'fs'
import path from 'path'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase/storage'
import { initializeApp as initilFirebaseApp } from 'firebase/app'

import logger from '../logger'

export function initialFirebase(event) {
  try {
    const config = useRuntimeConfig(event)
    const filePath = path.resolve(process.cwd(), config.firebaseKey)
    const serviceAccount = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

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
