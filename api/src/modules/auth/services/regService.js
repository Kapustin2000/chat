import { User } from 'src/modules/user/user.model';
import { RegisterValidation } from 'src/modules/auth/services/validator';

const RegService = {
    async reg(data) {

       const { error } = RegisterValidation(data);

       if( error ) {
           throw error.details[0].message;
       }

       const { name, email, role, password } = data;

       this.checkIfEmailIsBusy(email);

       let user = new User({
           email: email,
           name: name,
           role: role
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
            throw "email exists";
        }
    }
};

export { RegService };
