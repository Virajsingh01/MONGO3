const mongoose = require("mongoose");
const Chat =require("./models/chat.js");
//const { create } = require("./models/chat.js");
main()
.then(()=>{
    console.log("connection successful");
}).catch((err) => 
 console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
let allChats =[{
    from: "neha",
    to: "priya",
    msg:"send me your marksheet",
    created_at: new Date()
},
{
    from :"viraj",
    to: "Shikha",
    msg: "we are good friend",
    created_at : new Date()
},

{
    from: "monu",
    to :"sneha",
    msg :"kdfhvbsdj",
    created_at: new Date()
},  
];
                                
Chat.insertMany(allChats);



