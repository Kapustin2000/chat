import { User } from 'src/modules/user/user.model';
import { RegisterValidation } from 'src/modules/auth/services/validator';
import { Role } from 'src/modules/user/role.model';

const RegService = {
    async reg(data) {

       const { error } = RegisterValidation(data);

       if( error ) {
           throw error.details[0].message;
       }

       const { name, email, password } = data;

       this.checkIfEmailIsBusy(email);

       let user = new User({
           email: email,
           name: name,
           role: await Role.findOne({ name: 'Client'}).then(role => { return role._id})
       });

        await user.setPassword(password);

        user = await user.save();

        return {
            token : await user.generateJWT()
        }
    },
    async checkIfEmailIsBusy(email) {
        const emailExists = await User.findOne({email: email});

        if(emailExists) {
            return res.json({ message: "Email exists."}).status(500);
        }
    }
};

export { RegService };
