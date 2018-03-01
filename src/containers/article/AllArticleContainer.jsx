import React from 'react'
import PropTypes from 'prop-types'
import styles from './AllArticleContainer.scss'
import { Tag, Button, Table, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getArticleDetail, getArticleList, deleteArticle } from '../../actions/article'
import { getCategory } from '../../actions/category'
import moment from 'moment'

class AllArticleContainer extends React.Component {
    state = {
        isLoading: false
    }

    constructor(props) {
        super(props)
        this.handleEditArticle = this.handleEditArticle.bind(this)
        this.handleDeleteArticle = this.handleDeleteArticle.bind(this)
        this.handleCategoryName = this.handleCategoryName.bind(this)
    }

    componentWillMount() {
        this.props.getCategory()
        this.setState({isLoading: true})
        this.props.getArticleList().then(res => this.setState({isLoading: false}))
    }

    handleEditArticle(record) {
        this.setState({isLoading: true})
        this.props.getArticleDetail(record.key).then(res => {
            this.setState({isLoading: false})
            if (res) {
                this.context.router.history.push('/index/article_edit')
            }
        })
    }

    handleDeleteArticle(record) {
        this.setState({isLoading: true})
        this.props.deleteArticle(record.key).then(res => this.setState({isLoading: false}))
    }

    handleCategoryName(id) {
        const category = this.props.category.find(i => i.id == id)
        return category ? category.name : ''
    }

    render() {
        const columns = [{
            title: '文章标题',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <div className='article-table-title'>
                    <span>{text}</span>
                    <span>
                        {record.isRecommend ? <Tag color="blue">推荐</Tag> : null}
                        {record.isRed ? <Tag color="red">标红</Tag> : null}
                        {record.isTop ? <Tag color="green">置顶</Tag> : null}
                    </span>
                </div>
            )
        },{
            title: '所属版块',
            dataIndex: 'categoryId',
            key: 'categoryId',
            sorter: (a, b) => a.categoryId - b.categoryId,
            render: (text, record) => (
                <div>{this.handleCategoryName(text)}</div>
            )
        },{
            title: '来源',
            dataIndex: 'source',
            key: 'source',
            sorter: (a, b) => a.source.localeCompare(b.source)
        },{
            title: '发布时间',
            dataIndex: 'publishTime',
            key: 'publishTime',
            sorter: (a, b) => a.publishTime - b.publishTime,
            render: (text, record) => (
                <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
            )
        },{
            title: '操作',
            width: 165,
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button type="primary" onClick={this.handleEditArticle.bind(this, record)} style={{marginRight: '20px'}}>编辑</Button>
                    <Popconfirm title="确定删除这篇文章吗？" onConfirm={this.handleDeleteArticle.bind(this, record)} okText="确定" cancelText="取消">
                        <Button type="danger" >删除</Button>
                    </Popconfirm>
                </div>
            ),
        }];

        const data = this.props.articleList.toJS()

        return (
            <div className={styles.container}>
                <Table loading={this.state.isLoading} columns={columns} dataSource={data} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
	articleList: state.getIn(['article', 'articleList']),
    category: state.getIn(['category', 'category']),
})

const mapDispatchToProps = dispatch => ({
    getArticleList: bindActionCreators(getArticleList, dispatch),
    getArticleDetail: bindActionCreators(getArticleDetail, dispatch),
    getCategory: bindActionCreators(getCategory, dispatch),
    deleteArticle: bindActionCreators(deleteArticle, dispatch),
})

AllArticleContainer.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllArticleContainer))
