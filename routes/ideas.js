const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bodyparser = require("body-parser");

//load idea model
require('../models/Idea');
const Idea = mongoose.model('ideas')


module.exports = router


//idea index page
router.get('/',(req,res)=>{
    Idea.find({})
    .sort({date:"desc"})
    .then(ideas => {
        res.render('ideas/index',{
           ideas:ideas 
        })
    })
    
})

//add idea form
router.get('/add',(req,res)=>{
  res.render('ideas/add')
})

//edit idea form
router.get('/edit/:id',(req,res)=>{
   // res.render('ideas/edit')
    Idea.findOne({
        _id:req.params.id 
    })
    .then(idea=>{
      res.render("ideas/edit",{
        idea:idea
    })
  })
})

//Process form
router.post('/',(req,res)=>{
  console.log(req.body)
   // res.send('ok')
   let errors = [];

   if(!req.body.title){
       errors.push({text:"Please add title"});
   }
   if(!req.body.details){
       errors.push({text:"Please add some details"})
   }
   if(errors.length > 0){
       res.render('ideas/add',{
         errors:errors,
         title:req.body.title,
         details:req.body.details  
       });
 
   } else {
       const newUser = {
           title: req.body.title,
          details: req.body.details
       }
       new Idea(newUser)
       .save().then(idea =>{
           req.flash('success_msg','Tech idea added')
           res.redirect('/ideas')
       })
      
    
   }

});

// edit form process
router.put("/:id",(req,res)=>
{
    Idea.findOne({
        _id:req.params.id
    })
    .then(idea=>{
        //new values
        idea.title = req.body.title,
        idea.details = req.body.details

        idea.save()
        .then(idea =>{
            req.flash('success_msg','Tech idea update')
            res.redirect("/ideas")
        })
    })
})
//middleware for session management and routes protecting

//delete idea
router.delete('/:id',(req,res)=>{
    Idea.remove({_id: req.params.id})
    .then(()=>{ 
        req.flash('success_msg',"Idea removed")
        res.redirect('/ideas')
    })
})

