const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())

// All your handlers here...
var db
app.post('/employee', (req, res) => {
    if(req.body.action=="update")
{
 console.log(req.body.action)
db.collection('employee').update({ name: req.body.name } , {$set:{ name:req.body.name,age:req.body.age,dob:req.body.dob }}
,(err, result) => {
    if (err) return console.log(err)
console.log('Update Record to database')
res.redirect('/employee')
})

}
else
{
    db.collection('employee').save(req.body, (err, result) => {
        if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/employee')
})
}
    
}

)
app.get('/employee', (req, res) => {
    db.collection('employee').find().toArray((err, result) => {
        if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {employee: result,employeeedit:[{name:"",age:"",dob:""}]})
})
})

app.get('/Role', (req, res) => {
    db.collection('role').find().toArray((err, result) => {
        if (err) return console.log(err)
    // renders index.ejs
    res.render('RoleList.ejs', {roles: result,rolesedit:[{name:"",rolename:""}]})
})
})

app.post('/Role', (req, res) => {
    if(req.body.action=="update")
{
 console.log(req.body.action)
db.collection('role').update({ name: req.body.name } , {$set:{ name:req.body.name,age:req.body.rolename }}
,(err, result) => {
    if (err) return console.log(err)
console.log('Update Record to database')
res.redirect('/Role')
})

}
else
{
    db.collection('role').save(req.body, (err, result) => {
        if (err) return console.log(err)
    console.log(req.body)
    console.log('saved to database')
    res.redirect('/Role')
})
}
    
}

)

app.get('/', (req, res) => {
    res.render('home.ejs',"")
})

app.get('/employee/Delete/:id', (req, res) => {
    db.collection('employee').remove({name:req.params.id})
    res.redirect('/employee')
})

app.get('/Role/Delete/:id', (req, res) => {
    db.collection('role').remove({name:req.params.id})
    res.redirect('/Role')
})


app.get('/employee', (req, res) => {
    res.redirect('/employee')
})

app.get('/Role/Edit/:id', (req, res) => {
    db.collection('role').find({name:req.params.id}).toArray((err, result) => {
        if (err) return console.log(err)
    // renders index.ejs
 res.render('RoleList.ejs', {roles: result,rolesedit:result})
})
   
})


app.get('/employee/Edit/:id', (req, res) => {
    db.collection('employee').find({name:req.params.id}).toArray((err, result) => {
        if (err) return console.log(err)
    // renders index.ejs
 res.render('index.ejs', {employee: result,employeeedit:result})
})
   
})

app.get('/Department', (req, res) => {
    db.collection('department').find().toArray((err, result) => {
        if (err) return console.log(err)
    // renders index.ejs
    res.render('Department.ejs', {departments: result,departmentsedit:[{departmentname:""}]})
})
})


app.post('/Department', (req, res) => {
    if(req.body.action=="update")
{
 console.log(req.body.action)
db.collection('department').update({ departmentname: req.body.departmentname } , {$set:{ departmentname:req.body.departmentname }}
,(err, result) => {
    if (err) return console.log(err)
console.log('Update Record to database')
res.redirect('/Department')
})

}
else
{
    db.collection('department').save(req.body, (err, result) => {
        if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/Department')
})
}
    
}

)


app.get('/Department/Edit/:id', (req, res) => {
    db.collection('department').find({departmentname:req.params.id}).toArray((err, result) => {
        if (err) return console.log(err)
    // renders index.ejs
   
 res.render('Department.ejs', {departments: result,departmentsedit:result})
})
   
})


app.get('/Department/Delete/:id', (req, res) => {
    db.collection('department').remove({departmentname:req.params.id})
    res.redirect('/Department')
})


MongoClient.connect('mongodb://verma:verma@ds055535.mlab.com:55535/suneelmango', (err, database) => {
    if (err) 
  return console.log(err)
db = database
  
});
app.listen(4000, function() {
    console.log('listening on 4000')
  
})