import React from 'react'
import PropTypes from 'prop-types'
import styles from './AddArticleContainer.scss'
import Editor from '../../components/common/Editor'
import { Form, Input, Button, Select, Checkbox, Icon, Upload, message } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getCategory } from '../../actions/category'
import { addArticle, isArticleSingle } from '../../actions/article'
import config from '../../config'
import _ from 'lodash'

const FormItem = Form.Item;
const Option = Select.Option;

class AddArticleContainer extends React.Component {
    state = {
        imgUrl: '',
        imgName: '',
        attachUrl: '',
        attachName: ''
    }
    constructor(props) {
        super(props)
        this.handleResetForm = this.handleResetForm.bind(this)
        this.handleSetContent = this.handleSetContent.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleIsSingle = this.handleIsSingle.bind(this)
    }

    componentWillMount() {
        this.props.getCategory()
    }

    handleIsSingle(categoryId) {
        this.props.isArticleSingle(categoryId).then(res => {
            if(!res) {
                message.error('该类文章已存在，无法新增')
                this.props.form.resetFields(['categoryId'])
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { imgUrl, attachUrl, imgName, attachName } = this.state
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const article = _.extend(values, {imgUrl, attachUrl, imgName, attachName})
                console.log('Received values of form: ', article);
                this.props.addArticle(article).then(res => {
                    if (res) {
                        this.context.router.history.push('/index/article_all')
                    }
                })
            }
        });
    }

    handleSetContent(content) {
        this.props.form.setFieldsValue({content})
    }

    handleResetForm() {
        this.props.form.resetFields()
    }

    render() {
        const _this = this

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 19 },
        };
        const buttonItemLayout = {
            wrapperCol: { span: 14, offset: 3 },
        }

        const { categories } = this.props

        const imageProps = {
            name: 'img',
            action: config.api.upload.image,
            headers: {
                authorization: sessionStorage.getItem('accessToken')
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    _this.setState({imgUrl: info.file.response.obj, imgName: info.file.name})
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 上传成功`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败`);
                }
            },
        };

        const attachProps = {
            name: 'attach',
            action: config.api.upload.attach,
            headers: {
                authorization: sessionStorage.getItem('accessToken')
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    const attachUrl = info.fileList.map(f => f.response.obj).join(',')
                    const attachName = info.fileList.map(f => f.name).join(',')
                    _this.setState({attachUrl, attachName})
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 上传成功`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败`);
                }
            },
        };

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
                            <Select onChange={this.handleIsSingle} placeholder="请选择所属版块" dropdownStyle={{zIndex: 1000000}} >
                                {categories.map((c, index) => (
                                    <Option key={c.id} value={c.id + ''}>{c.name}</Option>
                                ))}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="选项"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('isTop')(
                            <Checkbox>置顶</Checkbox>
                        )}
                        {getFieldDecorator('isRed')(
                            <Checkbox>标红</Checkbox>
                        )}
                        {getFieldDecorator('isRecommend')(
                            <Checkbox>推荐</Checkbox>
                        )}
                    </FormItem>
                    {/* <FormItem
                        label="是否标红"
                        {...formItemLayout}
                    >
                    </FormItem> */}
                    <FormItem
                        label="来源"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('source', {
                            rules: [{ required: true, message: '请输入文章来源' }],
                            initialValue: 'admin'
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
                        <Editor onContentChange={this.handleSetContent}/>
                    </FormItem>
                    <FormItem
                        label="新闻图片"
                        {...formItemLayout}
                    >
                        <Upload {...imageProps}>
                            <Button>
                                <Icon type="upload" /> 点击上传
                            </Button>
                        </Upload>
                    </FormItem>
                    <FormItem
                        label="附件"
                        {...formItemLayout}
                    >
                        <Upload {...attachProps}>
                            <Button>
                                <Icon type="upload" /> 点击上传
                            </Button>
                        </Upload>
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

AddArticleContainer.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

const WrappedAddArticleForm = Form.create()(AddArticleContainer);

const mapStateToProps = state => ({
	categories: state.getIn(['category', 'category']),
})

const mapDispatchToProps = dispatch => ({
    getCategory: bindActionCreators(getCategory, dispatch),
    isArticleSingle: bindActionCreators(isArticleSingle, dispatch),
    addArticle: bindActionCreators(addArticle, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedAddArticleForm))
