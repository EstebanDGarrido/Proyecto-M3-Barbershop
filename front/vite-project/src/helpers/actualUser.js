export function getUserIdFromLocalStorage() {
    try {
        const storedUser = localStorage.getItem("actualUser");
        if (!storedUser) return null;
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.actualUser?.id) return parsedUser.actualUser.id;
        if (parsedUser?.user?.id) return parsedUser.user.id;
        if (parsedUser?.id) return parsedUser.id;
        return null;
    } catch (error) {
        console.log("Error al parsear datos desde el localStorage");
        return null;
    }
}
