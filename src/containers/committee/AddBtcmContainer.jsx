import React from 'react'
import PropTypes from 'prop-types'
import styles from './AddBtcmContainer.scss'
import { Form, Input, Button, Select, Checkbox, Icon, Upload, message } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getCategory } from '../../actions/category'
import { addBtcm } from '../../actions/committee'
import config from '../../config'
import _ from 'lodash'

const FormItem = Form.Item;
const Option = Select.Option;

class AddBtcmContainer extends React.Component {
    state = {
    }
    constructor(props) {
        super(props)
        this.handleResetForm = this.handleResetForm.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let formdata = new FormData()
                formdata.append('code', values.code)
                formdata.append('password', values.password)
                formdata.append('realName', values.realName)
                formdata.append('btcId', values.btcId)
                this.props.addBtcm(formdata).then(res => {
                    if (res) {
                        this.context.router.history.push('/index/btcm_all')
                    }
                })
            }
        });
    }

    handleResetForm() {
        this.props.form.resetFields()
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 19 },
        };
        const buttonItemLayout = {
            wrapperCol: { span: 14, offset: 3 },
        }

        return (
            <div className={styles.container}>
                <Form layout="horizontal">
                    <FormItem
                        label="用户名"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('code', {
                            rules: [{ required: true, message: '请输入管理员用户名' }],
                            initialValue: ''
                        })(
                            <Input placeholder="请输入用户名"/>
                        )}
                    </FormItem>
                    <FormItem
                        label="密码"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请设置管理员密码'}],
                            initialValue: ''
                        })(
                            <Input type="password" placeholder="请设置密码" />
                        )}
                    </FormItem>
                    <FormItem
                        label="真实姓名"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('realName',{
                            rules:[{required:true, message:'请输入真实姓名'}]
                        })(
                            <Input placeholder="请输入真实姓名" />
                        )}
                    </FormItem>
                    <FormItem
                        label="所属委员会"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('btcId',{
                            rules:[{required:true, message:'请选择所属委员会'}],
                            initialValue: '1'
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

                    <FormItem {...buttonItemLayout}>
                        <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleResetForm}>重置</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

AddBtcmContainer.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

const WrappedAddUserForm = Form.create()(AddBtcmContainer);

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    addBtcm: bindActionCreators(addBtcm, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedAddUserForm))
