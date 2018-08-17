import React from 'react';

class ListSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType: 'productId',//productId /productName
            searchKeyword: ''
        }
    }

    //数据变化的时候
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        });
    }

    //点击搜索按钮的时候
    onSearch() {
        this.props.onSearch(this.state.searchType, this.state.searchKeyword);
    }
    //输入关键字后按回车，自动提交
    onSearchKeywordKeyUp(e) {
        if (e.keyCode === 13) {
            this.onSearch();
        }
    }

    render() {
        return (
            <div className="row search-wrap" style={{textAlign:'center'}}>
                <div className="col-md-12" style={{marginTop:'15px'}}>
                    <div className="form-inline">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="请输入关键词或商品ID"
                                   name="searchKeyword"
                                   onKeyUp={(e)=>this.onSearchKeywordKeyUp(e)}
                                   onChange={(e)=>this.onValueChange(e)}/>
                        </div>
                        <button  className="btn btn-info"
                         onClick={(e)=>this.onSearch()}>搜索</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default ListSearch;