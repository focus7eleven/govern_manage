import React from 'react'
import styles from './ContentOnly.scss'
import { Form, Input, Button } from 'antd'
import Editor from './Editor'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getArticleByCategory, getArticleDetail, updateArticleContent } from '../../actions/article'
import { getCategory } from '../../actions/category'

const FormItem = Form.Item;

class ContentOnly extends React.Component {
    state = {
        initialContent: '',
        articleId: ''
    }

    constructor(props) {
        super(props)
        this.handleContentChange = this.handleContentChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        if (!this.props.category.length) {
            this.props.getCategory().then(res => {
                const categoryId = this.props.category.find(i => i.name === this.props.contentName).id
                this.props.getArticleByCategory(categoryId)
            })
        } else {
            const categoryId = this.props.category.find(i => i.name === this.props.contentName).id
            this.props.getArticleByCategory(categoryId)
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.articleList.length > 0) {
            const article = nextProps.articleList[0]
            this.setState({articleId: article.articleId, initialContent: article.content})
        }
    }

    handleContentChange(content) {
        this.props.form.setFieldsValue({content})
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            console.log(this.state.articleId);
            if (!err) {
                this.props.updateContent(this.state.articleId, values.content).then(res => {
                    if (res) {
                        console.log(res);
                    }
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };

        const buttonItemLayout = {
            wrapperCol: { span: 14, offset: 4 },
        }

        return (
            <div className={styles.container}>
                <Form layout="horizontal">
                    <FormItem
                        label={this.props.contentName}
                        {...formItemLayout}
                        className={styles.editor}
                    >
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: '请输入文章内容' }],
                        })(
                            <Input style={{display: 'none'}}/>
                        )}
                        <Editor initialContent={this.state.initialContent} onContentChange={this.handleContentChange}/>
                    </FormItem>

                    <FormItem {...buttonItemLayout}>
                        <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                        <Button style={{ marginLeft: 8 }}>重置</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const WrappedContentOnlyForm = Form.create()(ContentOnly);

const mapStateToProps = state => ({
    category: state.getIn(['category', 'category']),
    articleList: state.getIn(['article', 'articleByCategory'])
})

const mapDispatchToProps = dispatch => ({
    getCategory: bindActionCreators(getCategory, dispatch),
    getArticleByCategory: bindActionCreators(getArticleByCategory, dispatch),
    updateContent: bindActionCreators(updateArticleContent, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedContentOnlyForm))
