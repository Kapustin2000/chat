import { Role } from 'src/modules/user/role.model.js';

const RolesSeeder  =
    Role.create([
        {
            name: "Admin"
        },
        {
            name: "Client"
        }
    ]);

export { RolesSeeder };
