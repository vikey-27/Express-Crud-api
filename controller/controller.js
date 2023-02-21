const HttpError = require("../models/http-error");
const User = require("../models/user");

const createlist = async (req, res, next) => {
  const { email, description } = req.body;
  const createUser = new User({
    email,
    description,
  });
  let existingdesc=await User.findOne({description});
  if(existingdesc)
  {
    return next(new HttpError('Description is already present',409))
  }
  console.log(existingdesc);
  let result=await createUser.save();
   if(!result)
   {
    return next(new HttpError('List not added',409))
   }
  res.send({ message: "List added successfully",id:result.id });
};

const getlist = async (req, res, next) => {
  let result;
  result = await User.find();
  if(result.length == 0) {
    return next(new HttpError('No data is Found',404));
  }
  res.send({ result });
};

const deletelist=async (req,res,next)=>{
    const listid=req.params.lid;
    const result=await User.findByIdAndDelete(listid);
    if(!result)
    {
        return next(new HttpError('List is not deleted',404));
    }
    res.send({message:'Deleted successfully',id:result.id});
    
};

const updatelist=async(req,res,next)=>{
    let listid=req.params.lid;
    const{email,description}=req.body;
    const result=await User.findByIdAndUpdate(listid,{email,description},{new:true});
    if(!result)
    {
        return next(new HttpError('List is not updated',404));
    }
    res.send({message:'Updated successfully',id:result.id});

};

exports.createlist = createlist;
exports.getlist = getlist;
exports.deletelist=deletelist;
exports.updatelist=updatelist;
