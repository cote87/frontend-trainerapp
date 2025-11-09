export const LOGIN = 'login'
export const LOGOUT = 'logout'

export const LoginReducer = (state = {}, action) => {

    switch (action.type) {
        case LOGIN:
            return (
                {
                    isAuth: true,
                    isAdmin: action.payload.isAdmin,
                    provinceId: action.payload.provinceId,
                    nickname: action.payload.nickname,
                    user: action.payload.user,
                }
            );
        case LOGOUT:
            return (
                {
                    isAuth: false,
                    isAdmin: false,
                    nickname: undefined,
                    provinceId: undefined,
                    user: undefined
                }
            );

        default:
            return state;
    }
}