const router = require('express').Router();
const { date } = require('joi');
const Blog = require('../models/Blog')

// Your routing code goes here


router.get('/blog', (req, res) => {
   Blog.find().then(response =>{
    res.status(200).json({
        messege:"data fetched successfully",
        data:response,
    })
   }).catch(err =>{
    res.status(400).json({
        messege:"data fetched failed",
        err:err
    })
   })
});




    router.post("/blog", (req, res) => {
        // console.log(req.body);
        const blog = new Blog({
          topic: req.body.topic,
          description: req.body.description,
          posted_at: new Date(),
          posted_by: req.body.posted_by,
        });
         blog.save().then((da)=>{
            res.status(200).json({
                messege:"post created successfully",
                data:da
            })
         }).catch((err) =>{
            console.log(err);
            res.status(500).json({
                messege:"post creation failed",
                err:err
            })
         })
      });
      

    //   router.put("/blog/:id", async (req, res) => {
    //     try {
    //       let postId = req.params.id;
    //       let { topic, description, post_by } = req.body;
      
    //       let blog = await Blog.findById(postId);
      
    //       if (!blog) {
    //         return res.status(200).json({ message: "Blog not found" });
    //       }
      
    //       blog.topic = topic;
    //       blog.description = description;
    //       blog.post_by = post_by;
      
    //       let updatedPost = await blog.save();
      
    //       res.status(200).json({
    //         message: "Blog updated successfully",
    //         data: updatedPost,
    //       });
    //     } catch (err) {
    //       res.status(500).json({
    //         message: "Failed to update post",
    //         err: err.message,
    //       });
    //     }
    //   });

    router.put("/blog/:id" , async (req,res)=>{

        try{
            let postId = req.params.id;
            let {topic,description,post_by} = req.body;
    
            let blog = await Blog.findById(postId);
    
            if(!blog){
                res.status(200).json({
                    messege:"post not found"
                })
            }
            blog.topic = topic;
            blog.description = description;
            blog.post_by = post_by;
    
            let updated = await blog.save();
    
            res.status(200).json({
                messege:"post updated successfully",
                data : updated
            })
        }
        catch{
             res.status(500).json({
                messege:"something wend wrong",
             })
        }
        

    })


    router.delete("/blog/:id", async(req,res)=>{
        try{
       let postId = req.params.id;
       let data = await Blog.findOneAndDelete(postId).then(d =>{
               res.status(200).json({
                messege:"post deleted successfully",
                data:d,
               })
       }).catch(err =>{
        res.status(300).json({
            messege:err,
        })
       })
        }
        catch{
             res.status(500).json({
                messege:"something went wrong"
             })
        }
    })

module.exports = router;