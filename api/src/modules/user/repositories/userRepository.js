import { User } from 'src/modules/user/user.model';
import { Role } from 'src/modules/user/role.model';

const UserRepository = {
     async admin() {
        return  await User.findOne({
            role: await Role.findOne({name: "Admin"}).then(role => { return role })
        });
    }
};

export { UserRepository };
