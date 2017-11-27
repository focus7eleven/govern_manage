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
import { isArticleSingle, updateArticle } from '../../actions/article'
import config from '../../config'

const FormItem = Form.Item;
const Option = Select.Option;

class EditArticleContainer extends React.Component {
    state = {
        categoryId: 0,
        imgList: [],
        imgUrl: '',
        attachUrl: '',
        imgName: '',
        attachName: '',
        content: '',
        isTop: 0,
        isRed: 0,
        isRecommend: 0,
    }

    constructor(props) {
        super(props)
        this.handleSetContent = this.handleSetContent.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleGoBack = this.handleGoBack.bind(this)
        this.handleImgListChange = this.handleImgListChange.bind(this)
        this.handleIsSingle = this.handleIsSingle.bind(this)
    }

    componentWillMount() {
        if (!this.props.article) {
            this.context.router.history.push('/index/article_all')
        } else {
            const {content, categoryId, isTop, isRed, isRecommend, imgUrl, attachUrl, imgName, attachName} = this.props.article
            let imgList = []
            if( imgUrl ) {
                imgList = [{
                    uid: 0,
                    status: 'done',
                    name: imgName,
                    url: imgUrl
                }]
            }
        this.setState({content, categoryId, isTop, isRed, isRecommend, imgUrl, attachUrl, imgName, attachName, imgList})
        }
    }

    componentDidMount() {
        const article = this.props.article
        if (article) {
            this.props.form.setFieldsValue({
                title: article.title,
                categoryId: article.categoryId + '',
                isTop: article.isTop,
                isRed: article.isRed,
                isRecommend: article.isRecommend,
                source: article.source,
                content: article.content
            })
        }
    }

    handleIsSingle(categoryId) {
        this.props.isArticleSingle(categoryId).then(res => {
            console.log(this.state.categoryId);
            if(!res && +categoryId !== +this.state.categoryId) {
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
                console.log(article);
                this.props.updateArticle(this.props.article.articleId, article).then(res => {
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

    handleGoBack() {
        this.context.router.history.push('/index/article_all')
    }

    handleImgListChange(info) {
        let fileList = info.fileList;

        fileList = fileList.slice(-1);

        fileList = fileList.map((file) => {
            if (file.response) {
                file.url = file.response.obj;
            }
            return file;
        });

        fileList = fileList.filter((file) => {
            if (file.response) {
                return file.status === 'done';
            }
            return true;
        });

        const img = fileList[0]

        if (!img) {
            this.setState({imgList: [], imgUrl: '', imgName: ''})
            return
        }

        if (img.status === 'done') {
            message.success(`${img.name} 上传成功`);
            this.setState({imgUrl: img.url, imgName: img.name})
        } else if (info.file.status === 'error') {
            message.error(`${img.name} 上传失败`);
        }

        this.setState({ imgList: fileList });
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
            onChange: this.handleImgListChange,
        };

        const attachFileNames = this.state.attachName ? this.state.attachName.split(',') : []
        const attachFileUrls = this.state.attachUrl ? this.state.attachUrl.split(',') : []
        const attachFiles = attachFileNames.map((n, index) => ({uid: index, url: attachFileUrls[index], name: n, status: 'done'}))

        const attachProps = {
            name: 'attach',
            action: config.api.upload.attach,
            headers: {
                authorization: sessionStorage.getItem('accessToken')
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.fileList);
                    const attachUrl = info.fileList.map(f => {
                        let url = ''
                        if (f.response) {
                            url = f.response.obj
                        } else {
                            url = f.url
                        }
                        return url
                    }).join(',')
                    const attachName = info.fileList.map(f => f.name).join(',')
                    _this.setState({attachUrl, attachName})
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 上传成功`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败`);
                }
            },
            defaultFileList: attachFiles
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
                            <Checkbox defaultChecked={this.state.isTop}>置顶</Checkbox>
                        )}
                        {getFieldDecorator('isRed')(
                            <Checkbox defaultChecked={this.state.isRed}>标红</Checkbox>
                        )}
                        {getFieldDecorator('isRecommend')(
                            <Checkbox defaultChecked={this.state.isRecommend}>推荐</Checkbox>
                        )}
                    </FormItem>
                    {/* <FormItem
                        label="是否标红"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('isRed')(
                            <Checkbox defaultChecked={this.state.isRed}></Checkbox>
                        )}
                    </FormItem> */}
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
                        {
                            this.state.content ?
                                <Editor initialContent={this.state.content} onContentChange={this.handleSetContent}/>
                                :
                                null
                        }
                    </FormItem>
                    <FormItem
                        label="新闻图片"
                        {...formItemLayout}
                    >
                        <Upload {...imageProps} fileList={this.state.imgList}>
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
                        <Button style={{ marginLeft: 8 }} onClick={this.handleGoBack}>返回</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

EditArticleContainer.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

const WrappedEditArticleForm = Form.create()(EditArticleContainer);

const mapStateToProps = state => ({
	categories: state.getIn(['category', 'category']),
    article: state.getIn(['article', 'editArticle'])
})

const mapDispatchToProps = dispatch => ({
    getCategory: bindActionCreators(getCategory, dispatch),
    isArticleSingle: bindActionCreators(isArticleSingle, dispatch),
    updateArticle: bindActionCreators(updateArticle, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedEditArticleForm))
