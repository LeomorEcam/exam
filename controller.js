const Model = require('./models/model.js');
const wordTab = require('./models/WordTab.js');
let express = require("express");
let router = express.Router();
router.use(express.static('.'));    //dossier
let model = new Model.Model();
//const TV = Model.TV()
let session = require('express-session');

router.use(session({
    secret: 'leoSecret',
    resave: false,
    saveUninitialized: true
}));

router.get('/modify',async function(request,response){
    const listWord = await wordTab.Word.loadMany();
    response.render('modify.ejs', { tabMap: listWord});
});

router.get('/',async function(request,response){
    const listWord = await wordTab.Word.loadMany();
    const aleat = Math.round(Math.random() * (listWord.length-1));
    console.log(aleat);
    const myStruct = {
        "Word": listWord[aleat].Word,
        "pos": aleat,
        "Translation":listWord[aleat].Translation
    }
    console.log(myStruct);
    response.render('index.ejs', { tab: myStruct});
});

router.post('/modify',async function(request,response){
    if(request.body.button == "Delete"){
        await wordTab.Word.delete({"Word":request.body.Word});
    }else if(request.body.button == "Submit"){
        const w = new wordTab.Word();
        w.update({"Word": request.body.Word,"Translation":request.body.Translation});
        await w.save();
    }
    const listWord = await wordTab.Word.loadMany();
    
    response.render('modify.ejs', { tabMap: listWord});
});

router.post('/',async function(request,response){
    const listWord = await wordTab.Word.loadMany();
    console.log(listWord);
    const word= listWord[request.body.pos].Word;
    let feedback = "";
    console.log(request.body.pos);
    console.log(listWord.length);
    if(request.body.Rep === request.body.Answer){
        feedback = "GREAT JOB";

    }else{
        
        console.log("here");
        feedback = "Fail, the answer was "+  request.body.Rep + ".";
    }
    console.log(feedback)
    
    
    let aleat = Math.round(Math.random() * (listWord.length-1));
    const wAleat = listWord[aleat].Word;
    console.log("-----------------------------");
    console.log(listWord.length);
    console.log(aleat);

    const myStruct = {
        "Feedback": feedback,
        "Word": wAleat,
        "pos": aleat,
        "Translation":listWord[aleat].Translation
    }
    response.render('index.ejs', { tab: myStruct});
});
module.exports = router;
