import { fetcher } from '../helpers/fetcher';

const dbAuthProvider = {
    isAuthenticated: false,
    async signIn(data) {
        debugger;
        const userId = await fetcher('/auth/login', 'POST', data);
        return userId;
    },
    signOut(callback) {
        dbAuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    },
};

export { dbAuthProvider };
