import React from 'react'
import RCPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';
//这是通用分页组件
class Pagination extends React.Component
{
    constructor(props){
        super(props);
    }
    render()
    {
        return(
            <div className="row" style={{float:'right'}}>
                <div className="col-md-12">
                    <RCPagination {...this.props}
                    hideOnSinglePage
                    showQuickJumper/>
                </div>
            </div>
        );
    }
}
export default Pagination;