export interface ITodoList {
	id: string;
	name: string;
}

export type TSignInType = 'email' | 'phone';

export interface IUser {
	uid: string;
	email: string | null;
	phone: string | null;
	is2FAEnabled: boolean;
	twoFASecret?: string;
	ip?: string;
	phoneModel?: string;
	phoneId?: string;
}

export type TBiometricType = 'touchId' | 'faceId' | 'fingerprint' | 'none';