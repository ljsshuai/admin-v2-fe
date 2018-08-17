import FileUpload from './react-fileupload.jsx';
import React from 'react'

class FileUploader extends React.Component{
render(){
    const options={
        baseUrl:'/manage/product/upload.do',
        fileFieldName:'upload_file',
        dataType :'json',
        chooseAndUpload:true,
        uploadSuccess   :(res) =>{
           this.props.onSuccess(res.data)
        },
        uploadError:(errMsg)=>{this.props.onError(errMsg.message||'上传图片出错啦')}
    }
    return (
        <FileUpload options={options}>
            <button className="btn btn-xs btn-default" ref="chooseAndUpload">选择图片</button>
        </FileUpload>
    )
}
}
export default FileUploader