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
       });

       if(!user) {
           throw "Wrong credantionals";
       }

       const validPass = user.comparePassword(password);

       if(validPass) {
           return {
               token : await user.generateJWT()
           }
       } else {
           throw "Wrong credantionals";
       }
    },
};

export { LoginService };
