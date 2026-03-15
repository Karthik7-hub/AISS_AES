import sendEmail from "../../configurations/nodemailer.js";
import Faculty from "../../models/faculty.js";
import bcrypt from "bcryptjs";

export const registerFaculty = async(req,res)=>{
  try{

    const {name,email,password,department,phone} = req.body;

    const hashedPassword = await bcrypt.hash(password,10);

    const faculty = await Faculty.create({
      name,
      email,
      password:hashedPassword,
      department,
      phone
    });

    // check if HOD exists
    const hod = await Faculty.findOne({
      department,
      role:"hod"
    });

    if(hod){
        hod.pendingApprovals.push(faculty);

        await sendEmail(hod.email,'A new faculty','Approve or rejecty him/her');
    }else{
        
    }

    res.json({
      message:"Registration request sent for approval"
    });

  }catch(err){
    res.status(500).json(err);
  }
};

export const loginFaculty = async(req,res)=>{
  try{

    const {email,password} = req.body;

    const faculty = await Faculty.findOne({email});

    if(!faculty)
      return res.status(400).json({message:"User not found"});

    const match = await bcrypt.compare(password,faculty.password);

    if(!match)
      return res.status(400).json({message:"Invalid password"});

    const otp = Math.floor(100000 + Math.random()*900000).toString();

    faculty.otp = otp;
    faculty.otpExpires = Date.now() + 5*60*1000;

    await faculty.save();

    await sendEmail(email,"Login OTP",`Your OTP is ${otp}`);

    res.json({message:"OTP sent to email"});

  }catch(err){
    res.status(500).json(err);
  }
};

export const verifyOTP = async(req,res)=>{
  try{

    const {email,otp} = req.body;

    const faculty = await Faculty.findOne({email});

    if(!faculty)
      return res.status(400).json({message:"User not found"});

    if(faculty.otp !== otp || faculty.otpExpires < Date.now())
      return res.status(400).json({message:"Invalid OTP"});

    faculty.otp = null;
    faculty.otpExpires = null;

    await faculty.save();

    res.json({message:"Login successful"});

  }catch(err){
    res.status(500).json(err);
  }
};