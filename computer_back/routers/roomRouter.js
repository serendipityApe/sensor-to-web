const Router = require('koa-router');
const Room =  require('../db/model/room');
let router = new Router({prefix: '/rooms'})

router.post('/add',async (ctx,next) =>{
    let{name,admin,local}=ctx.request.body;
    if(!name || !admin ||!local){
        ctx.body={
            code:-1,
            msg:'值不能为空'
        }
    }else{
        let roomAdd=await Room.insertMany({name,admin,local})
        if(roomAdd){
            console.log(roomAdd)
            ctx.body = {
                code: 0,
                msg: '注册成功',
              }
        }else{
            ctx.body = {
                code:-1,
                msg: '注册失败'
            }
        }
    }
})
router.get('/temp',async (ctx,next) =>{
    let data={};
    ctx.body = {
        code: 0,
        msg: data,
      }
})
module.exports=router