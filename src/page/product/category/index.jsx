import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from "../../../component/page-title/index.jsx";
import 'rc-pagination/dist/rc-pagination.min.css'
import TableList from '../../../until/table-list/index.jsx'
import MUtil  from '../../../until/mm.jsx'
import Product from '../../../service/product-service.jsx'
import Pagination from '../../../until/pagination/index.jsx'

const  _product = new Product();
const _mm = new MUtil();

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
        };
    }
    componentDidMount() {
        this.loadCategoryList();
    }
    componentDidUpdate(prevProps,prevState){
        let oldPath=prevProps.location.pathname,
            newPath=this.props.location.pathname,
            newId = this.props.match.params.categoryId||0;
        if(oldPath !==newPath){
            this.setState({
                parentCategoryId:newId
            },()=>{
                this.loadCategoryList();
            });
        }
    }
    //加载品位列表
    loadCategoryList() {
        _product.getCategoryList(this.state.pageNum).then(res =>{
            console.log(res)
            this.setState({
                list:res
            });
        },errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    //更新品类的名字
    onUpdateName(categoryId, categoryName) {
        let newName = window.prompt('请输入新的品类名称', categoryName);
        if (newName) {
            _product.updateCategoryName({
                categoryId: categoryId,
                categoryName: newName
            }).then(res => {
                _mm.successTips(res);
                this.loadCategoryList();
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }
    }
    //页数发生变化的时候
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadCategoryList();
        });
    }
    render() {
        let listBody = this.state.list.map((category, index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a className="opear"
                           onClick={(e) => this.onUpdateName(category.id, category.name)}>修改名称</a>
                        {
                            category.parentId ===0
                                ?<Link to={`/product-category/index/${category.id}`}>查看子品类</Link>:null
                        }
                    </td>
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表">
                    <div className="page-header-right">
                    <Link to="/product-category/add" className="btn btm-primary">
                        <i className="fa fa-plus"></i>
                        <span>添加品类</span>
                    </Link>
                    </div>
                </PageTitle>
            <div className="row">
            <div className="col-md-12" >
            <p>父品类ID：{this.state.parentCategoryId}</p>

            <TableList tableHeads={['品类ID', '品类名称', '操作']}>
            {listBody}
            </TableList>
                <Pagination
                    total={this.state.total}
                    current={this.state.pageNum}
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
            </div>
            </div>
            </div>
        )

    }
}
export default CategoryList;