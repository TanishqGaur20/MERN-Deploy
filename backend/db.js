const mongoose = require('mongoose');

// const mongo_uri = "mongodb+srv://GoFood:GoFood@cluster0.hjmk9nn.mongodb.net/GoFood?retryWrites=true&w=majority"
const mongo_uri = "mongodb://GoFood:GoFood@ac-00pkh8k-shard-00-00.hjmk9nn.mongodb.net:27017,ac-00pkh8k-shard-00-01.hjmk9nn.mongodb.net:27017,ac-00pkh8k-shard-00-02.hjmk9nn.mongodb.net:27017/GoFood?ssl=true&replicaSet=atlas-el2h33-shard-0&authSource=admin&retryWrites=true&w=majority"
const Db = async () => {
    try {
        await mongoose.connect(mongo_uri);

        console.log('Connnected');
        const fetched_data = mongoose.connection.db.collection('user');
        global.food_data = await fetched_data.find({}).toArray();
        const foodcategory0 = mongoose.connection.db.collection('foodcategory');
        global.foodcategory = await foodcategory0.find({}).toArray();
    } catch (err) { console.log("ERROR TRY", err); }
}
module.exports = Db;