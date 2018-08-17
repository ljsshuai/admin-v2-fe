import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from "../../component/page-title/index.jsx";

class Error extends React.Component
{
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title="出错啦"/>
                <div className="row">
                    找不到路径,
                    <Link to="/">点我返回首页</Link>
                </div>
            </div>
        );
    }

}
export default  Error;