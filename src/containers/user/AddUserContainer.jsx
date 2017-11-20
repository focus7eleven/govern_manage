import React from 'react'
import PropTypes from 'prop-types'
import styles from './AddUserContainer.scss'
import { Form, Input, Button, Select, Checkbox, Icon, Upload, message } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getCategory } from '../../actions/category'
import { addAdmin } from '../../actions/user'
import config from '../../config'
import _ from 'lodash'

const FormItem = Form.Item;
const Option = Select.Option;

class AddUserContainer extends React.Component {
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
                formdata.append('adminName', values.adminName)
                formdata.append('password', values.password)
                this.props.addAdmin(formdata).then(res => {
                    if (res) {
                        this.context.router.history.push('/index/admin_all')
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
                        {getFieldDecorator('adminName', {
                            rules: [{ required: true, message: '请输入管理员用户名' }],
                        })(
                            <Input placeholder="请输入用户名" />
                        )}
                    </FormItem>
                    <FormItem
                        label="密码"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请设置管理员密码'}]
                        })(
                            <Input placeholder="请设置密码" />
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

AddUserContainer.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

const WrappedAddUserForm = Form.create()(AddUserContainer);

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    addAdmin: bindActionCreators(addAdmin, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedAddUserForm))
