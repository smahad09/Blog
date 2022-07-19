const router = require('express').Router();
const Post =  require('../models/post');

//Get All Posts
router.get('/all', async (request,response)=> {
    const allPosts = await Post.find();
    response.status(200).json(allPosts);
});

//Get Single Post
router.get("/:id", async (request,response)=> {
    const post_id = request.params.id;
    const getPost = await Post.findById(post_id);
    getPost? response.status(200).json(getPost) : response.status(404).json("Post Not Found");
});

//Create A New Post
router.post("/new", async (request,response)=> {
    const post_stuff = new Post(request.body);
    console.log(post_stuff);
    try {
        await post_stuff.save();
        response.status(200).json(post_stuff);
    } catch (error) {
        response.status(500).json(error);
    }
})

//Update A Post
router.put("/:id", async(request,response)=> {
    try {
        const updatePost = await Post.findByIdAndUpdate(request.params.id, {
            $set: request.body,
        });   
        response.status(200).json(updatePost);
    } catch (error) { response.status(500).json(error); } 
});

//Delete A Post
router.delete("/:id", async(request,response)=> {
    try {
        const deletedPost = await Post.findByIdAndDelete(request.params.id);
        response.status(200).json(deletedPost);
    } catch(error) { response.status(500).json(error); }
})


module.exports = router;