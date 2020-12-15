import { Search } from 'src/modules/search/search.model';

const SearchService = {
    async search(user_id) {
       const { email, password } = data;


       let search = await Search.findOne({
           user_id: user_id
       });

       if(search) {
           throw "You are already in queue.";
       }

        return await new Search({
            user_id: user_id
        }).save();
    },
};

export { SearchService };
