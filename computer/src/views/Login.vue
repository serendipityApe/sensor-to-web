<template>
  <div class="content">
      <span class="item userName">
        <el-input placeholder="请输入账号" v-model="us"></el-input>
      </span>
      <span class="item password">
        <el-input placeholder="请输入密码" v-model="ps" show-password></el-input>
      </span>
      <span class="item go">
        <el-button type="primary" @click="login">登录</el-button>
      </span>
  </div>
</template>

<script>
export default {
    name:'Login',
    data(){
        return{
            ps:'',
            us:'',
        }
    },
    //admin 123456
    methods:{
      async login(){
        var loginForm={
          us:this.us,
          ps:this.ps
        }
        this.$http.post('http://localhost:8080/api/users/login',loginForm)
        .then((res)=>{
          console.log(res)
        })
      if(this.us=='admin' && this.ps=='123456'){
        this.$router.push('admin')
      }
      }
    }
}
</script>

<style lang="scss">
body {
		left: 0;
		top: 0;
		width:100%;
		height:100%;  
		z-index:-1;
		position: fixed;
    	background-repeat: no-repeat;
    	background-size: cover;
		background-image: url(../assets/imgs/login_back.jpg);
        .content{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 400px;
            padding: 40px;
            background: #213B54;
            
            box-sizing: border-box;
            // box-shadow: 0 15px 25px rgba(77,74,70,.5);
            border-radius: 10px;

            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            .item{
                margin: 10px 0;
            }
            .go{
                display: flex;
                justify-content: center;
            }
        }
	}
</style>