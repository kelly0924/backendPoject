
const express=require("express")

const app=express()//express 객체를 생성히고
const port=8000
app.use(express.json()) //json을 인식해주도록 설정
//db 설정 해주기 
const mariadb=require("./mariaDB")//미리 만들어 놓은 파일을 불러 오겠다. 
// const connection = mariadb.createConnection({
//     host: '127.0.0.1',
//     port:3306,
//     user: 'backendProject',
//     password: '1234',
//     database: 'backendProjectDB'
// });
// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });  
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/loginPage",(req,res)=>{
    res.sendFile(__dirname + "/loginPage.html")
    //response 보내 준다. sendfile을 file을 보내 준다. 
})

app.post("/login",(req,res)=>{
    //프론트엔드로 부터 값을 받아 오기, require
    const idValue= req.body.id
    const pwValue= req.body.pw
    //프론트 엔드로 보내 줄값 json으로 받았으니까 json으로 보내 줄것이다. 
    let result ={
        "sucess":false
    }
    //로그인 체크 알고리즘 디비에서 데이터를 불러서 비교를 해서 보내 주기 
    mariadb.connect(function(err) {//디 연동하기 
        if (err) throw err
        console.log("Connected!")
    })
    let sql="SELECT * FROM user"
    mariadb.query(sql,function(err, rows,fields){
        if(err){
            console.log("err")
        }else{
            for(let index =0; index<rows.length; index++){
                // console.log(rows[index].userId, rows[index].userPw)
                // console.log(idValue,pwValue)
                const dbId=rows[index].userId
                const dbPw=rows[index].userPw
                if(idValue == dbId && pwValue == dbPw){
                    result.sucess=true
                    // console.log("if 문 들어 온다")
                    // console.log(result.sucess)
                }

            }
        }
    })
    //프론드에게 값을 반환
    res.send(result)// 값만 보내 줄것이다. 값을 보내  때는 send로 보내 준다.
})

//회원 가입 API

app.get("/memberJoin",(req,res)=>{
    res.sendFile(__dirname + "/memberJoin.html")
})

app.post("/memberJoinPage",(req,res)=>{
    const usId=req.body.id
    const usPw=req.body.pw
    let result={
        "sucess":false
    }
    mariadb.connect(function(err) {//디 연동하기 
        if (err) throw err
        console.log("Connected!")
    })
    let sql="INSERT INTO user(userId,userPw) VALUES(?,?)"
    let paramiter=[usId,usPw]
    mariadb .query(sql,paramiter, function(err,rows,fields){
        if(err){
            console.log("err")
        }
        else{
            console.log("save user impormation")
            result.sucess=true// 회원 가입이 잘 됬는지를 체크 하기 위한 것 
           // res.redirect("/loginPage")
        }
    })
    mariadb.end()

    res.send(result)//성공 하였다면 true 아니면 false를 프론트엔드에게 보내 줄것이다. 
    // res.sendFile(__dirname + "/loginPage.html")
})

// 모든 사람의 메모를 보는 api 

app.get("/main",(req,res)=>{
    res.sendFile(__dirname + "/mainpage.html")
})
//메모를 보여 주는 api
app.get("/mainPage",(req,res)=>{
    
    let datas={}//json 선언만 하기 

    mariadb.connect(function(err) {//디 연동하기 
        if (err) throw err
        console.log("Connected!")
    })
    let sql="SELECT *FROM memo"
    mariadb.query(sql,function(err,rows,fields){
        console.log(rows.length)
        res.send(rows)//rows 자체가 json상태로 되여 있다. 
    })
    mariadb.end()
})

//메모를 추가 하는 api
app.get("/addMemo",(req,res)=>{
    res.sendFile(__dirname + "/addMemoPage.html")
})

app.listen(port,()=>{
    console.log(port + " http 와 통신 할것이다.")
})

