
const _mm=new Mutil();
import Mutil from "../until/mm.jsx";
class Statistic
{
    //首页数据统计
    getHomeCount(){
        return _mm.request(
            {
                type:'post',
                url:'/manage/statistic/base_count.do',
            });
    }


}
export default Statistic;
