
const _mm=new Mutil();
import Mutil from "../until/mm.jsx";
class User
{
    login(loginInfo){
        return  _mm.request({
            type:'post',
            url:'/manage/user/login.do',
            data:loginInfo
        });
    }
    //检查登陆接口的数据是否合法
    checkLoginInfo(loginInfo)
{
    let username =$.trim(loginInfo.username),
        password =$.trim(loginInfo.password);
    //判断用户名为空
    if(typeof  username !=='string' || username.length===0){
        return{
            status:false,
            msg:'用户名不能为空'
        }
    }
    if(typeof  password !=='string' ||username.length===0){
        return{
            status:false,
            msg:'密码不能为空'
        }
    }
    return{
            status:true,
            msg:"验证通过"
    }
}
//退出登陆
    Logout()
    {
        return _mm.request({
            type:'post',
            url :'/user/logout.do'
        })
    }
    getUserList(pageNum)
    {
        return _mm.request(
            {
                type :'post',
                url :'/manage/user/list.do',
                data :{
                  pageNum : pageNum
                }
            });
    }
}
export default User;
