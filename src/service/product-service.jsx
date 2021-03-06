
const _mm=new Mutil();
import Mutil from "../until/mm.jsx";
class Product
{
    //获取商品列表
   getProductList(listParam)
    {

        console.log(listParam)
        let url = '',
            data={};
        if(listParam.listType==='list'){
            url='/manage/product/list.do';
            data.pageNum =listParam.pageNum;
        }else if (listParam.listType==='search'){
               console.log(listParam.Keyword);
               console.log(isNaN(listParam.Keyword)?'productName':'productId');
                url ='/manage/product/search.do?'+(isNaN(listParam.Keyword)?'productName='+ listParam.Keyword:'productId='+ listParam.Keyword);
                data.pageNum = listParam.pageNum;
                data[listParam.searchType] = listParam.Keyword;
        }
        return _mm.request(
            {
                 type :'get',
                 url:url,
                 data:data
            });
    }
    //获取商品详情
    getProduct(productId){
        return _mm.request({
            type:'post',
            url :'/manage/product/detail.do',
            data :{
                productId:productId||0
            }
        });
    }
    //变更商品销售状态
    setProductStatus(productInfo){
        return _mm.request({
            type:'post',
            url :'/manage/product/set_sale_status.do',
            data :productInfo
        });
    }
    //检查保存商品的表单数据
    checkProduct(product){
       let result = {
           status:true,
           msg:'验证通过'
       }
       //判断名为空
        if(typeof product.name!=='string' ||product.name.length===0)
        {
            return{
                status:false,
                msg:'商品名称不能为空！'
            }
        }
        //判断描述不能为空
        if(typeof product.subtitle!=='string' ||product.subtitle.length===0)
        {
            return{
                status:false,
                msg:'商品描述不能为空！'
            }
        }
        //品类ID
        if(typeof product.categoryId!=='number' ||product.categoryId<0)
        {
            return{
                status:false,
                msg:'请选择商品品类！'
            }
        }
        //判断价格为数字且不为0
        if(typeof product.price!=='number' ||!(product.price >=0))
        {
            return{
                status:false,
                msg:'请输入正确的商品价格！'
            }
        }
        //判断库存为数字，且大于或等于0
        if(typeof product.stock!=='number' ||!(product.stock>=0))
        {
            return{
                status:false,
                msg:'请输入正确的库存数量！'
            }
        }
        return result;
    }


    //保存商品
    saveProduct(product){
            return _mm.request({
                type :'post',
                url: '/manage/product/save.do',
                data: product
            })
    }
    /*
    *品类相关
    */
    //根据父品类id获取品类列表
   getCategoryList(pageNum)
    {
        return _mm.request({
            type :'post',
            url :'/manage/category/get_category.do',
            data :{
                pageNum : pageNum
            }
        })
    }
    //新增品类列表
    saveCategory(category)
    {
        return _mm.request({
            type :'post',
            url :'/manage/category/add_category.do',
            data :category
        })
    }
    //修改品类名称
    updateCategoryName(category)
    {
        return _mm.request({
            type :'post',
            url :'/manage/category/set_category_name.do',
            data :category
        })
    }


}
export default Product;