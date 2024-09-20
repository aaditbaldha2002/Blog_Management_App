import Post from "../models/Post.js";
import {spawn} from 'child_process';

/** For Getting Post Analysis */
export const getPostStats=async (req,res)=>{
    try {
        const {postId}=req.params;
        var id=postId;
        console.log("Data sent to python file:"+JSON.stringify(id));
    } catch (err) {
        res.status(404).json({ message: err.message });
        console.log("error finding the post");
    }
    const childPython=spawn('python',['./controllers/sentimentAnalysis.py',JSON.stringify(id)]);
    childPython.stdout.on('data',(data)=>{
        console.log("Output of python file:"+ data);
        res.status(200).json({msg:`${data}`});
    });
    childPython.stderr.on('data',(err)=>{
        console.log(`Error of python file: ${err}`);
    });
};
