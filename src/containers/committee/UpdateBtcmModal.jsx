import React from 'react'
import styles from './UpdateBtcmModal.scss'
import { Row, Col, Checkbox, Modal, Form, Input, Button, Select } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { updateBtcm } from '../../actions/committee'
import _ from 'lodash'

const FormItem = Form.Item
const Option = Select.Option

class UpdateBtcmModal extends React.Component {
    state = {
    }

    handleOk = (e) => {
        e.preventDefault();
        this.props.closeModal()
    }

    handleCancel = (e) => {
        this.props.closeModal()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let formdata = new FormData()
                formdata.append('id', this.props.btcm.id)
                formdata.append('password', values.password)
                formdata.append('btcId', values.btcId)
                this.props.updateBtcm(formdata, this.props.btcm.id, values.password, values.btcId).then(res => {
                    if (res) {
                        // this.context.router.history.push('/index/btcm_all')
                        this.props.closeModal()
                    }
                })
            }
        });
    }

    handleResetForm() {
        this.props.form.resetFields()
    }

    render( ) {
        const { btcm } = this.props

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        }

        return (
            <Modal
				title='更新账户'
                visible={true}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
			>
                <Form layout="horizontal">

                    <FormItem
                        label="密码"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请设置管理员密码'}],
                            initialValue: btcm.password
                        })(
                            <Input placeholder="请设置密码" />
                        )}
                    </FormItem>

                    <FormItem
                        label="所属委员会"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('btcId',{
                            rules:[{required:true, message:'请选择所属委员会'}],
                            initialValue: '' + btcm.btcId
                        })(
                            <Select style={{width:'100%'}} >
                                <Option value='1' key='male'>一分委</Option>
                                <Option value='2' key='female'>二分委</Option>
                                <Option value='3' key='female'>三分委</Option>
                                <Option value='4' key='female'>八分委</Option>
                                <Option value='5' key='female'>ISO/TC21/SC6</Option>
                            </Select>
                        )}
                    </FormItem>

                    {/* <FormItem {...buttonItemLayout}>
                        <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleResetForm}>重置</Button>
                    </FormItem> */}
                </Form>

			</Modal>
        )
    }
}

const WrappedForm = Form.create()(UpdateBtcmModal);

const mapStateToProps = state => ({
    // category: state.getIn(['article', 'category']),
})

const mapDispatchToProps = dispatch => ({
    updateBtcm: bindActionCreators(updateBtcm, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedForm))
