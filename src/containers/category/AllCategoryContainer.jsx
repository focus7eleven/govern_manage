import React from 'react'
import styles from './AllCategoryContainer.scss'
import { Button, Table } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getCategory } from '../../actions/category'

class AllCategoryContainer extends React.Component {
    constructor(props) {
        super(props)
        this.handleEditCategory = this.handleEditCategory.bind(this)
        this.handleDeleteCategory = this.handleDeleteCategory.bind(this)
    }

    componentWillMount() {
        this.props.getCategory()
    }

    handleEditCategory(record) {
        console.log(record);
    }

    handleDeleteCategory(record) {
        console.log(record);
    }

    render() {
        const columns = [{
            title: '版块名称',
            dataIndex: 'name',
            key: 'name'
        },{
            title: '操作',
            width: 330,
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button type="primary" onClick={this.handleEditCategory.bind(this,record)} style={{marginRight: '20px'}}>编辑</Button>
                    <Button type="danger" onClick={this.handleDeleteCategory.bind(this,record)}>删除</Button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllCategoryContainer))
