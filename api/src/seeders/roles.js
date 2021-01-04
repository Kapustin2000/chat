import { Role } from 'src/modules/user/role.model.js';
import { connect } from 'src/config/db.js';

const RolesSeeder  = connect().then(() => {
    Role.create([
        {
            name: "Admin"
        },
        {
            name: "Client"
        }
    ]);

    console.log("Roles seeder ok");
}).catch(err => {
    console.log(err);
});

export { RolesSeeder };
