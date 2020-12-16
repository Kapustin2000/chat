import { Search } from 'src/modules/search/search.model';

const SearchService = {
    async search(user_id) {
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
