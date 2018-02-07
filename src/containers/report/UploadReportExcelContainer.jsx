import React from 'react'
import styles from './UploadReportExcelContainer.scss'
import { Upload, Button, Icon } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { uploadExcel, uploadExcelUrl } from '../../actions/report'

class UploadReportExcelContainer extends React.Component {
    handleUploadExcel = ({ file, onSuccess, onProgress }) => {
        let formData = new FormData()
        formData.append('excelFile', file)
        this.props.uploadExcel(formData).then(res => {
            if (res.obj) {
                // let urlForm = new FormData()
                // urlForm.append('url', res.obj)
                const urlForm = JSON.stringify({url: res.obj})
                this.props.uploadExcelUrl(urlForm).then(res => {
                    console.log(res);
                    onSuccess()
                })
            }
        })
    }

    render() {
        return (
            <div className={styles.container}>
                <Upload
                  name="excel"
                  customRequest={this.handleUploadExcel}
                >
                  <Button className={styles.uploadButton}>
                    <Icon type="upload" /> 点击此处上传
                  </Button>
                </Upload>
            </div>
        )
    }
}

const mapStateToProps = state => ({
	// articleList: state.getIn(['article', 'articleByCategory']),
})

const mapDispatchToProps = dispatch => ({
    uploadExcel: bindActionCreators(uploadExcel, dispatch),
    uploadExcelUrl: bindActionCreators(uploadExcelUrl, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadReportExcelContainer))
