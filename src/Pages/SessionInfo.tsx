const storedUserData = sessionStorage.getItem('Data')
let adminData: any

if (storedUserData) {
    try {
        adminData = JSON.parse(storedUserData);
    } catch (error) {
        console.error('Error accessing stored user data:', error);
    }
}

export default adminData