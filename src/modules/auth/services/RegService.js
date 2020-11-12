import { User } from 'src/modules/user/user.model';

const RegService = {
    async reg(data) {
       const { name, email, password } = data;

       this.checkIfEmailIsBusy(email);

       let user = new User({
           email: email,
           name: name
       });

        await user.setPassword(password);

        return await user.save();
    },
    async checkIfEmailIsBusy(email) {
        const emailExists = await User.findOne({email: email});

        if(emailExists) {
            throw "email exists";
        }
    }
};

export { RegService };
