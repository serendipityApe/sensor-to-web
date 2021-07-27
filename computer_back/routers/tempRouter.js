const Router = require('koa-router');
const temp =  require('../db/model/temp');
let router = new Router({prefix: '/temps'})

router.post('/add',async (ctx,next) =>{
    let{name,admin,local}=ctx.request.body;
    if(!name || !admin ||!local){
        ctx.body={
            code:-1,
            msg:'值不能为空'
        }
    }else{
        let tempAdd=await temp.insertMany({temp,now})
        if(tempAdd){
            console.log(tempAdd)
            // ctx.body = {
            //     code: 0,
            //     msg: '注册成功',
            //   }
        }else{
            console.log('添加失败')
            // ctx.body = {
            //     code:-1,
            //     msg: '注册失败'
            // }
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