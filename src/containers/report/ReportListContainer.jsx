import React from 'react'
import styles from './ReportListContainer.scss'
import PropTypes from 'prop-types'
import { Tag, Button, Table, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getReportList } from '../../actions/report'
import moment from 'moment'

class ReportListContainer extends React.Component {
    state = {
        isLoading: false
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.setState({ isLoading: true })
        this.props.getReportList().then(res => {
            this.setState({ isLoading: false })
        })
    }

    render() {
        const columns = [{
            title: '文章标题',
            dataIndex: 'title',
            key: 'title',
        },{
            title: '来源',
            dataIndex: 'source',
            key: 'source'
        },{
            title: '发布时间',
            dataIndex: 'publishTime',
            key: 'publishTime',
            render: (text, record) => (
                <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
            )
        }];

        const data = []

        return (
            <div className={styles.container}>
                <Table loading={this.state.isLoading} columns={columns} dataSource={data} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
	// articleList: state.getIn(['article', 'articleByCategory']),
})

const mapDispatchToProps = dispatch => ({
    getReportList: bindActionCreators(getReportList, dispatch),
})

ReportListContainer.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportListContainer))
