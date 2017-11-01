import React from 'react'
import styles from './AddArticleContainer.scss'
import Editor from '../../components/common/Editor'
import { Form, Input, Button, Select, Checkbox, DatePicker } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getCategory } from '../../actions/category'
import { addArticle } from '../../actions/article'


const FormItem = Form.Item;
const Option = Select.Option;

class AddArticleContainer extends React.Component {
    constructor(props) {
        super(props)
        this.handleResetForm = this.handleResetForm.bind(this)
        this.handleSetContent = this.handleSetContent.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        this.props.getCategory()
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.addArticle(values)
            }
        });
    }

    handleSetContent(content) {
        console.log(content);
        this.props.form.setFieldsValue({content})
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

        const { categories } = this.props

        return (
            <div className={styles.container}>
                <Form layout="horizontal">
                    <FormItem
                        label="标题"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入文章标题' }],
                        })(
                            <Input placeholder="请输入标题" />
                        )}
                    </FormItem>
                    <FormItem
                        label="所属版块"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('categoryId', {
                            rules: [{ required: true, message: '请选择文章所属版块'}]
                        })(
                            <Select placeholder="请选择所属版块" dropdownStyle={{zIndex: 1000000}} >
                                {categories.map((c, index) => (
                                    <Option key={c.id} value={c.id + ''}>{c.name}</Option>
                                ))}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="是否操作"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('isTop')(
                            <Checkbox>置顶</Checkbox>
                        )}
                        {/* {getFieldDecorator('isRed')(
                            <Checkbox>标红</Checkbox>
                        )} */}
                    </FormItem>
                    <FormItem
                        label="来源"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('source', {
                            rules: [{ required: true, message: '请输入文章来源' }],
                        })(
                            <Input placeholder="请输入来源" />
                        )}
                    </FormItem>
                    {/* <FormItem
                        label="发布时间"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('time', {
                            rules: [{ required: true, message: '请选择文章发布时间' }],
                            initialValue: moment()
                        })(
                            <DatePicker
                                showTime
                                // defaultValue={moment()}
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder="Select Time"
                                popupStyle={{zIndex: 1000000}}
                            />
                        )}
                    </FormItem> */}
                    <FormItem
                        label="内容"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: '请输入文章内容' }],
                        })(
                            <Input style={{display: 'none'}}/>
                        )}
                        <Editor setContent={this.handleSetContent}/>
                    </FormItem>
                    <FormItem
                        label="新闻图片"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('imageUrl')(
                            <Input placeholder="请输入来源" />
                        )}
                    </FormItem>
                    <FormItem
                        label="附件"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('attachUrl')(
                            <Input placeholder="input placeholder" />
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

const WrappedAddArticleForm = Form.create()(AddArticleContainer);

const mapStateToProps = state => ({
	categories: state.getIn(['category', 'category']),
})

const mapDispatchToProps = dispatch => ({
    getCategory: bindActionCreators(getCategory, dispatch),
    addArticle: bindActionCreators(addArticle, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedAddArticleForm))
