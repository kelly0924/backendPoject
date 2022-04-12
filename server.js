
const express=require("express")

const app=express()//express 객체를 생성히고
const port=8000
app.use(express.json()) //json을 인식해주도록 설정


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
    const pwValue= req.body.pwValue
    //프론트 엔드로 보내 줄값 json으로 받았으니까 json으로 보내 줄것이다. 
    const result ={
        "sucess":false
    }
    //로그인 체크 알고리즘 디비에서 데이터를 불러서 비교를 해서 보내 주기 
    if(idValue == "stageus" && pwValue=="1234"){
        result.sucess=true
    }
    //프론드에게 값을 반환
    res.send(result)// 값만 보내 줄것이다. 값을 보내  때는 send로 보내 준다.
})


app.listen(port,()=>{
    console.log(port + " http 와 통신 할것이다.")
})

