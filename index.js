const express = require("express");
const app =express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
// getting-started.js
const Chat =require("./models/chat.js");
app.set("views" ,path.join(__dirname, "views"));
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname, "public")));
//const {create} = require("domain");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method")); 
main()
.then(()=>{
    console.log("connection successful");
}).catch((err) => 
 console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
let chat1 = new Chat({
    from: "neha",
    to: "priya",
    msg:"send me your marksheet",
    created_at: new Date()
});

chat1.save().then((res) =>{
    console.log(res);
});


//INDEX ROUTE
app.get("/chats" ,async(req ,res) =>{
    let chats =await Chat.find();
//  console.log(chats);
//  res.send("working");
res.render("index.ejs",{chats});  
});


//NEW ROUTE
app.get("/chats/new" ,  (req,res) =>{
    res.render(("new.ejs"));
});


app.post("/chats" ,(req,res) =>{
    let{from ,to ,msg} =req.body;
let newChat =new Chat({
    from:from,
    to: to,
    msg :msg,
    created_at: new Date()
});
newChat
.save()
.then((res) =>{
    console.log("chat was saved");
})
.catch((err) =>{
    console.log(err);
});
 res.redirect('/chats');    
});


//EDIT ROUTE 
app.get("/chats/:id/edit" ,async(req ,res)=>{
    let {id} =req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs" ,{chat});

})


//UPDATE ROUTE 
app.put("/chats/:id" , async (req ,res)=>{
    let {id} =req.params;
    let {msg :newMsg} = req.body;
    console.log(newMsg);
    let updateChat = await Chat.findByIdAndUpdate(id ,{msg: newMsg},
        {runValidators: true , new :true}
    );
    console.log(updateChat);
    res.redirect("/chats");
});

//DELETE ROUTE 
app.delete("/chats/:id" ,async (req,res)=>{
    let {id} =req.params;                                                                                      
let DeletedCHat =await Chat.findByIdAndDelete(id);
console.log(DeletedCHat);
res.redirect("/chats");
})

app.get("/", (req,res) => {
    res.send("root is working");
});
app.listen(8080, () =>{
    console.log("server is listening on port 8080");

});

