
const _mm=new Mutil();
import Mutil from "../until/mm.jsx";
class Order
{
    //获取商品列表
    getOrderList(listParam)
    {
        let url = '',
            data={};
        if(listParam.listType==='list'){
            url='/manage/order/list.do';
            data.pageNum =listParam.pageNum;
        }else if (listParam.listType==='search'){
            url='/manage/order/search.do?productId='+listParam.Keyword+'&';
            data.pageNum =listParam.pageNum;
            data.orderNo =listParam.orderNo;
            // console.log(listParam)
            // console.log(data,999)
        }

        return _mm.request(
            {
                type :'get',
                url:url,
                data:data
            });
    }
    //获取订单详情
    getOrderDetail(orderNumber){
        return _mm.request({
            type:'post',
            url:'/manage/order/detail.do',
            data:{
                orderNo:orderNumber,
            }
        })
    }
    sendGoods(orderNumber)
    {
        return _mm.request({
            type:'post',
            url:'/manage/order/send_goods.do',
            data:{
                orderNo:orderNumber,
            }
        })
    }
}
export default Order;