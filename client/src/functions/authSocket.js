function authSocket() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        return {"token": user.accessToken};
    } 
    return {};
}

export default authSocket;