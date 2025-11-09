import api from "./api";

const URL = '/users';

const test = false;

export const getUsers = async ({ page, size, username }) => {
    test && console.log("getUsers");
    const contentUsername = username || "";
    try {
        const url = URL + "?page=" + page + "&size=" + size + "&username=" + contentUsername;
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const saveUser = async (user) => {
    test && console.log("saveUser");
    let response;
    try {
        if (user.id > 0) {
            const userRequest = {
                nickname: user.nickname,
                password: user.password,
                province: user.province,
                role: user.role,
                changePassword: user.changePassword,
            }
           response = await api.put(URL + '/' + user.id, userRequest)
        }
        else {
            const userRequest = {
                user: {
                    username: user.username,
                    password: user.password,
                    nickname: user.nickname,
                    province: user.province,
                    role: user.role,
                },
            };
            response = await api.post(URL, userRequest);
        }
            
        return response?.data;

    } catch (error) {
        throw error;
    }
}

export const editForm = async ({ username, nickname, currentPassword, newPassword }) => {
    test && console.log("changePassword");
    try {
        return await api.put("http://localhost:8080/api/perfil", {
            username: username,
            nickname: nickname,
            currentPassword: currentPassword,
            newPassword: newPassword
        });
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (id) => {
    test && console.log("deleteUser");
    try {
        await api.delete(URL + '/' + id);
        return true;
    } catch (error) {
        return false;
    }
}
