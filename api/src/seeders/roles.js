import { Role } from 'src/modules/user/role.model.js';
import { connect } from 'src/config/db.js';

let mongoose = connect();

Role.create([
    {
        name: "Admin"
    },
    {
        name: "Client"
    }
]);

mongoose.disconnect();
