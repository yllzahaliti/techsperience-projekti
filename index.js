const express=require('express');
const app=express();
const ejs=require('ejs');
const path=require('path');
const mongo=require('mongodb').MongoClient
const dbUrl='mongodb://localhost:27017/final';
const bodyParser=require('body-parser');
const ObjectId=require('mongodb').ObjectId;

mongo.connect(dbUrl, function(err, client) {
 if(err){
   console.log('error connecting to db');
 } else {
   console.log('connection to db was successful');
   kontrata=client.db('komuna').collection('kontrata');
 }
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.post('/kontrata/add', function(req, res){
 kontrata.insert({nrRendor: req.body.nrRendor, lloji: req.body.lloji,aktiviteti:req.body.aktiviteti,
 	dataInicimit:req.body.dataInicimit,dataPublikimit:req.body.dataPublikimit,dataNenshkrimit:req.body.dataNenshkrimit,
 	dataImplementimit:req.body.dataImplementimit,dataPermbylljes:req.body.dataPermbylljes,cmimi:req.body.cmimi,cmimiKontrates:req.body.cmimiKontrates,
 	kontraktuesi:req.body.kontraktuesi}, function(err,result){
   if(err){
     console.log(err);
   }
   res.redirect('/');

 });
});

app.get('/kontrata/edit/:id', function(req, res){
 console.log(req.params.id);
 kontrata.findOne({_id: ObjectId(req.params.id)}, function(err,doc){
   if(err){
     console.log(err);
   }
   res.render('edit', {doc: doc});
 });
});

app.post('/kontrata/update/:id', function(req, res){
 kontrata.updateOne({_id: ObjectId(req.params.id)},
 {$set: {nrRendor: req.body.nrRendor, lloji: req.body.lloji,aktiviteti:req.body.aktiviteti,
 	dataInicimit:req.body.dataInicimit,dataPublikimit:req.body.dataPublikimit,dataNenshkrimit:req.body.dataNenshkrimit,
 	dataImplementimit:req.body.dataImplementimit,dataPermbylljes:req.body.dataPermbylljes,cmimi:req.body.cmimi,cmimiKontrates:req.body.cmimiKontrates,
 	kontraktuesi:req.body.kontraktuesi}}, function(err, doc){
   if(err){
     console.log(err);
   }
   res.redirect('/');
 });
});

app.get('/kontrata/:id', function(req, res){
 console.log(req.params.id);
 kontrata.findOne({_id: ObjectId(req.params.id)}, function(err,doc){
   if(err){
     console.log(err);
   }
   res.render('detail', {doc: doc});
 });
});

app.get('/shto',function(req,res)
{
	res.render('index');
});

app.get('/', function(req, res){
  kontrata.find({}).toArray(function(err, docs){
   if(err){
     console.log(err);
   }
   res.render('show', {docs:docs});
 });
});

app.get('/kontrata/delete/:id', function(req, res){
 kontrata.deleteOne({_id: ObjectId(req.params.id)}, function(err, doc){
   if(err){
     console.log(err);
   }
   res.redirect('/');
 });
})

app.listen(5000, 'localhost', (err)=>{
 if(err){
   console.log('err');
 } else {
   console.log('server started listening');
 }
});


app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');