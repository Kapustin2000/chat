import { User } from 'src/modules/user/user.model';

const RegService = {
    async reg(data) {
       const { name, email, password } = data;

       let user = new User({
           email: email,
           name: name
       });

        await user.setPassword(password);

        return await user.save();
    }
};

export { RegService };
