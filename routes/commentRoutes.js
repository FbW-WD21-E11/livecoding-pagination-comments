import express from 'express';
import Comment from '../models/comment.js';

const router = express.Router();

//GET
router.get('/', async (req, res) => {
    const comments = await Comment.find().limit(20);

    return res.status(200).json(comments);
});

router.get('/paging/:skip/:limit', async(req, res) => {
    //skip:  before limiting skip this amount of documents => skip this many documents
    //limit: limit the amount of data to this number limit(5) => show us 5 documents
    const comments = await Comment.find().skip(req.params.skip).limit(req.params.limit);

    return res.status(200).json(comments);
});

//page=2 //pageSize=3 ?page=1&pageSize=5
router.get('/paging', async(req, res) => {
    //page = which page we're on 
    const page = Number(req.query.page) || 1;
    //how many do we want to display 
    const pageSize = Number(req.query.pageSize) || 10;
    //example page =2 and pageSize =3
    //(2-1) = 1 * 3 = skip(3)
    //example page =3 and pageSize =3
    //(3-1) = 2 * 3 = skip(6)
    //example page =4 and pageSize =3
    //(4-1) = 3 * 3 = skip(9)
    const skipRows = (page - 1) * pageSize;
    //lean(): will just return data. 
    //POJO: plain old javascript object (so just the data, no virtuals etc.)
    const comments = await Comment.find().skip(skipRows).limit(pageSize).lean()//.sort({name:1});// sort information ascending (1 = alphabetically)


    return res.status(200).json(comments);
});



export default router;