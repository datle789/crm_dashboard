const getAdminData = (): Promise<any | undefined> => {
    return new Promise((resolve) => {
        const storedUserData = sessionStorage.getItem('Data');
        let adminData: any;

        if (storedUserData) {
            try {
                adminData = JSON.parse(storedUserData);
            } catch (error) {
                console.error('Error parsing stored user data:', error);
            }
        }

        resolve(adminData);
    });
};

export default getAdminData;
