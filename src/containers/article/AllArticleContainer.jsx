import React from 'react'
import styles from './AllArticleContainer.scss'
import { Button, Table } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getCategory } from '../../actions/category'

class AllArticleContainer extends React.Component {
    constructor(props) {
        super(props)
        this.handleEditArticle = this.handleEditArticle.bind(this)
        this.handleDeleteArticle = this.handleDeleteArticle.bind(this)
    }

    componentWillMount() {
        this.props.getCategory()
    }

    handleEditArticle(record) {
        console.log(record);
    }

    handleDeleteArticle(record) {
        console.log(record);
    }

    render() {
        const columns = [{
            title: '文章名称',
            dataIndex: 'name',
            key: 'name'
        },{
            title: '操作',
            width: 330,
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button type="primary" onClick={this.handleEditArticle.bind(this, record)} style={{marginRight: '20px'}}>编辑</Button>
                    <Button type="danger" onClick={this.handleDeleteArticle.bind(this, record)}>删除</Button>
                </div>
            ),
        }];

        const data = this.props.categories

        return (
            <div className={styles.container}>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}


const mapStateToProps = state => ({
	categories: state.getIn(['category', 'category']),
})

const mapDispatchToProps = dispatch => ({
    getCategory: bindActionCreators(getCategory, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllArticleContainer))
