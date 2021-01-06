import { connect } from 'src/config/db.js';
import { ChatTypeSeeder } from 'src/seeders/chat-types.js';
import { RolesSeeder } from 'src/seeders/roles.js';

connect();

process.on('exit', function(code) {
    if(code === 1) {
        return console.log("Something went wrong.");
    }

    return console.log("All seeders are successful.");
});

Promise.all([
   ChatTypeSeeder,
    RolesSeeder
]).then(data => {
    process.exit(0);
}).catch(err => {
    console.log(err);
    process.exit(1);
});


