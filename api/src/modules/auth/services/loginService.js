import { User } from 'src/modules/user/user.model';
import { LoginValidation } from 'src/modules/auth/services/validator';

const LoginService = {
    async login(data) {

       const { error } = LoginValidation(data);

       if( error ) {
           throw error.details[0].message;
       }

       const { email, password } = data;


       let user = await User.findOne({
           email: email
       }).populate('role');

       if(!user) {
           throw "Wrong credantionals";
       }

       const validPass = await user.comparePassword(password);

       if(validPass) {
           return {
               access_token : await user.generateJWT()
           }
       } else {
           throw "Wrong credantionals";
       }
    },
};

export { LoginService };
