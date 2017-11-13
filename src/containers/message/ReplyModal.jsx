import React from 'react'
import { Modal, Form, Input, Button, Select } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { replyMessage } from '../../actions/message'

const FormItem = Form.Item
const Option = Select.Option

class ReplyModal extends React.Component {
    componentDidMount() {
        this.props.form.setFieldsValue({
            reply: this.props.message.reply,
        })
    }

    handleOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.replyMessage(this.props.message.id, values.reply).then(res => {
                    if (res) {
                        this.props.closeModal()
                    }
                })
            }
        });
    }

    handleCancel = (e) => {
        this.props.closeModal()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.replyMessage(this.props.message.id, values.reply).then(res => {
                    if (res) {
                        this.props.closeModal()
                    }
                })
            }
        });
    }

    render( ) {
        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol: {
                sm: { span: 4 },
            },
            wrapperCol: {
                sm: { span: 14 },
            },
        };
        const message = this.props.message
        return (
            <Modal
				title='回复留言'
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
			>
                <div>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <FormItem
                            {...formItemLayout}
                            label='用户昵称'
                        >
                            <span>{message.realName || '无'}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label='留言主题'
                        >
                            <span>{message.theme || '无'}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label='留言内容'
                        >
                            <span>{message.content || '无'}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label='回复'
                        >
                        {
                            getFieldDecorator('reply', {
                                rules:[{required:true, message: '请输入回复内容'}],
                                // initialValue: {message.reply}
                            })(
                                <Input type="textarea" rows={4}/>
                            )
                        }
                        </FormItem>
                    </Form>
                </div>

			</Modal>
        )
    }
}

const WrappedReplyModal = Form.create()(ReplyModal)

const mapStateToProps = state => ({
    // category: state.getIn(['article', 'category']),
})

const mapDispatchToProps = dispatch => ({
    replyMessage: bindActionCreators(replyMessage, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedReplyModal))
