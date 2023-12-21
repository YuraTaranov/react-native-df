import * as functions from "firebase-functions";
import * as speakeasy from 'speakeasy'
// import * as qrcode from 'qrcode'

export const createSecret = functions.https.onCall(async (data, context) => {
	const secret = speakeasy.generateSecret({
		name: 'FirebaseDemoApp'
	})
	// const qr = await qrcode.toDataURL(secret.otpauth_url)
	return secret
})

export const verifySecret = functions.https.onCall((data, context) => {
	const verified = speakeasy.totp.verify({
		secret: data.secret, // ascii
		encoding: 'ascii',
		token: data.code // code from authenticator
	})
	return verified
})

// export const userOnCreate = functions.auth.user().onCreate(user => {
// 	console.log(`user ${JSON.stringify(user, null, 2)}`)
// 	return Promise.resolve()
// })