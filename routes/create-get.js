const express=require('express');

const controller=require('../controller/controller');

const router=express.Router();

router.post('/createlist',controller.createlist);

router.get('/getlist',controller.getlist);

router.delete('/deletelist/:lid',controller.deletelist);

router.patch('/editlist/:lid',controller.updatelist);

module.exports=router;