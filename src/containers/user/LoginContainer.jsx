import React from 'react'
import PropTypes from 'prop-types'
import styles from './LoginContainer.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd';
import { login } from '../../actions/common'
const FormItem = Form.Item;

class LoginContainer extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(props) {
        if (props.isLogin && !this.props.isLogin) {
            this.context.router.history.push('/index')
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.login(values.username, values.password)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className={styles.container}>
                <div className={styles.title}>公安部天津消防研究院管理系统</div>
                <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '用户名不能为空' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '密码不能为空' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className={styles.loginBtn}>
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

LoginContainer.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

const WrapperLoginContainer = Form.create()(LoginContainer)

const mapStateToProps = state => ({
	isLogin: state.getIn(['common', 'isLogin']),
})

const mapDispatchToProps = dispatch => ({
    login: bindActionCreators(login, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrapperLoginContainer))
