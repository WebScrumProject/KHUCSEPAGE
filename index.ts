require('dotenv').config()
import express,{Request, Response} from 'express';
import path from 'path'
import scholarshipRoutes from './controllers/scholarshipController'
import projectRoutes from './controllers/projectController'
const app = express()
const connectMongoDB = require('./models/connectMongoDB')
const connectRedis = require('./models/connectRedis')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
const session = require("express-session");
const client = require ('./models/connectRedis')
interface CustomRequest extends Request {
  logout?: any;
  user?: any
  session?: any
}

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user:any,done:any)=>{
  done(null, user.id)
})
passport.deserializeUser((id:any,done:any)=>{
  client.hgetall(id, (err:any, user:any) => {
    if (err) return done(err);
    return done(null, user);
  });
})

app.listen(process.env.MAIN_PORT, function(){
    // const pythonScript = exec(`python3 ${pythonPath}`)
    // pythonScript.stderr.on('data', (data:any) => {
    // console.error(`stderr: ${data}`);
    // });
    connectRedis
    connectMongoDB
    console.log('listening on 8080')
})

app.get('/login', passport.authenticate('google', {scope:['profile','email']}))

app.get('/login/redirect', passport.authenticate('google', {
  failureRedirect: '/',
}), async (req: CustomRequest, res: Response) => {
  try {
    client.hget(req.user.id, 'usertype', (err: any, reply: any) => {
      if (err) throw err
      if (reply == 'user') {
        res.redirect('/');
      } else {
        res.redirect('/register');
      }
    });
  } catch (err) {
    res.status(400).send({"message":"경희대 웹메일만 사용 가능합니다."})
  }
});

app.get('/logout', (req: CustomRequest, res: Response) => {
  try{
    req.logout(); 
    req.session.destroy(() => { 
      res.redirect('/'); 
    });
  }
  catch(err:any){
    console.log(err)
  }
});


app.get('/authorization', Logined, (req:CustomRequest, res)=>{
  if (req.user){
    res.send({
      "isLogined" : "Logined",
      "name" : req.user.username,
      "profileImage" : req.user.profileImage,
      "userid": req.user.userid
    })
  }
  else{
    res.status(401).send({
      "isLogined" : "Not Logined",
      "name" : "",
      "profileImage" : ""
    })
  }
})

function register(data:any){
  let info:string =data.displayName
  let name:string="", college:string="", major:string, add:boolean=false
  let index:number=0;
  for(let i = 0; i<info.length; i++){
    if (info[i]!='[')
      name+=info[i]
    else {
      index=i
      break
    }
  }
  for(let i=index+1; i<info.length; i++){
    if (add==true)
      college+=info[i]
    if(info[i]=='('){
      add=true
    }
    else if (info[i]==' '){
      index = i;
      add=false
      break;
    }
  }
  major = info.substring(index+1,info.length-1)
  client.hset(data.id, "username", name)
  client.hset(data.id, "usercollege", college)
  client.hset(data.id, "usermajor", major)
  client.hset(data.id, "useremail", data.emails[0].value)
  client.hset(data.id, "userphone", "")
  client.hset(data.id, "usertype", "newuser")
  client.hset(data.id, "applyproj", JSON.stringify([]))
  client.hset(data.id,"portfolio", JSON.stringify([]))
  client.hset(data.id, "profileImage", data._json.picture)
}

function Logined(req:any,res:any, next:any):void{
  if (req.user){
    res.send({isLogined: "Logined", name: req.user.username})
    next()
  }
  else{
    res.send({isLogined: "Not Logined", name:""})
  }
}

passport.use(
  new GoogleStrategy(
     {
        clientID: process.env.OAUTH_ID, 
        clientSecret: process.env.OAUTH_PW,
        callbackURL: '/login/redirect',
     },
     async (accessToken:string, refreshToken:string, profile:any, done:any)=>{
        try{
          client.exists(profile.id, (err: any, reply: any)=>{
            if (err) throw err
            if (reply ==1){
              done(null,profile)
            }
            else{

              if (profile._json.hd == 'khu.ac.kr'){
                register(profile)
                done(null,profile)
              }
              else{
                done(null, false)
              }

            }
          })
        }
        catch (error){
          console.log(error)
          done(error)
        }
     }
  )
)

app.use('/scholarship', scholarshipRoutes)
app.use('/project', projectRoutes)

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
}); 
