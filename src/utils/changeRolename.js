export const changeRolename = (originalRolename) => {
    let rolename;

    switch (originalRolename) {
        case 'ROLE_SADMIN':
            rolename = 'Super Administrador';
            break;
        case 'ROLE_ADMIN':
            rolename = 'Administrador';
            break;
        case 'ROLE_USER':
            rolename = 'Usuario';
            break;
        case 'ROLE_READER':
            rolename = 'Lector';
            break;

        default:
            rolename = originalRolename;
            break;
    }

    return rolename;
}