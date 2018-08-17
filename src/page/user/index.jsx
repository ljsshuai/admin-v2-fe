import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from "../../component/page-title/index.jsx";
import 'rc-pagination/dist/rc-pagination.min.css'
import Pagination from '../../until/pagination/index.jsx'
import TableList from '../../until/table-list/index.jsx'
import MUtil  from '../../until/mm.jsx'
import User from '../../service/userservice.jsx'

const _user = new User();
const _mm = new MUtil();

class UserList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state ={
            list:[],
            pageNum : 1,
        };
    }
    componentDidMount()
    {
        this.loadUserList();
    }
    loadUserList(){
        _user.getUserList(this.state.pageNum).then(res=>
        {
            console.log(res)
            this.setState(res);
        },errMsg=>{
            _mm.errorTips(errMsg);
        });
    }
    //页数发生变化的时候
    onPageNumChange(pageNum)
    {
        this.setState({
            pageNum:pageNum
        },()=>{this.loadUserList();
    })
    }

    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <div className="row">
                <div className="col-md-12" >
                    <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>用户名</th>
                        <th>邮箱</th>
                        <th>电话</th>
                        <th>注册时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.list.map((user,index)=> {
                            return (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.updateTime}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                    </table>
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
export default  UserList;