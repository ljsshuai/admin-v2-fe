import React from 'react';
import {Link}from 'react-router-dom';
import PageTitle from '../../component/page-title/index.jsx'
import './index.scss'
import MUtil  from '../../until/mm.jsx'
const _mm = new MUtil();
import Statistic from '../../service/Statistic-Server.jsx'
import Pagination from '../../until/pagination/index.jsx'
const _statistic =new Statistic();
class Home extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            userCount :'-',
            productCount:'-',
            orderCount :'-',
        }
    }
    componentDidMount()
    {
        this.loadCount();
    }
    loadCount(){
        _statistic.getHomeCount().then(res=>{
            this.setState(res);
        },err=>{
            _mm.errorTips(errMsg);
        });
    }

    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title="首页">
                </PageTitle>
                <div className="row">
                    <div className="col-md-4">
                        <Link to='/user' className='color-box brown'>
                            <p className="count">{this.state.userCount}</p>
                            <p className='desc'>
                                <i className="fa fa-user-o"></i>
                                <span>用户总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4" >
                        <Link to='/product-category' className='color-box green'>
                            <p className="count">{this.state.productCount}</p>
                            <p className='desc'>
                                <i className="fa fa-list-ol"></i>
                                <span>商品总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to='/order'  className='color-box blue' >
                            <p className="count">{this.state.orderCount}</p>
                            <p className='desc'>
                                <i className="fa fa-check-square"></i>
                                <span>订单总数</span>
                            </p>
                        </Link>
                        <Pagination
                            total={this.state.total}
                            current={this.state.pageNum}
                            onChange={(pageNum)=>this.onPageNumChange(pageNum)}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;