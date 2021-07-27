const Router = require('koa-router');
const User =  require('../db/model/user');
let router = new Router({prefix: '/users'})
router.post('/login',async (ctx,next) =>{
    let{us,ps}=ctx.request.body;
    console.log(ctx.request)
    if(!us || !ps){
        ctx.body={
            code:-1,
            msg:'值不能为空'
        }
    }else{
        let goLogin=await User.find({us,ps})
        console.log(goLogin)
        if(goLogin.length>0){
            console.log(goLogin)
            ctx.body = {
                code: 0,
                msg: '登录成功',
              }
        }else{
            ctx.body = {
                code:-1,
                msg: '登录失败'
            }
        }
    }
})
module.exports=router