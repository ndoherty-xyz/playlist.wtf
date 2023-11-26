

export const storeTokenInLocalStorage = (token: string) => {
    window.localStorage.setItem("token", token)
}

export const removeTokenFromLocalStorage = () => {
    window.localStorage.removeItem('token')
}