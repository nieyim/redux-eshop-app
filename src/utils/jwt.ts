export function getJwtTokenFromSessionStorage() {
    const jwt = sessionStorage.getItem('token');
    if (jwt) {
        try {
            // Decode the token to extract user information
            const tokenPayload = window.atob(jwt.split('.')[1]);
            return JSON.parse(tokenPayload);
        } catch (error) {
            console.error('Error decoding the JWT token:', error);
        }
    }
    return null;
}
