import { setIsAuthorized, setToken } from "@reducers/global";
import { setIsUserVerified } from "@reducers/profile";
import { store } from "../store";

const clearUserCredentials = () => {
	store.dispatch(setToken(''));
	store.dispatch(setIsAuthorized(false));
	store.dispatch(setIsUserVerified(false));
}

export default clearUserCredentials