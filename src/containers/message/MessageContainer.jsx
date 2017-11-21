import React from 'react'
import styles from './MessageContainer.scss'
import PropTypes from 'prop-types'
import { Tag, Button, Table, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getMessageList, reviewMessage } from '../../actions/message'
import ReplyModal from './ReplyModal'
import moment from 'moment'

class MessageContainer extends React.Component {
    state = {
        message: {},
        isLoading: false,
        showReplyModal: false,
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getMessageList()
    }

    handleSwitchModal = (visible, message) => {
        this.setState({showReplyModal: visible, message})
    }

    handleReviewMessage = (record, pass) => {
        this.setState({isLoading: true})
        this.props.reviewMessage(record.id, pass).then(res => this.setState({isLoading: false}))
    }

    render() {
        const columns = [{
            title: '用户昵称',
            width: 150,
            dataIndex: 'realName',
            key: 'realName',
        },{
            title: '留言内容',
            dataIndex: 'content',
            key: 'content',
            render: (text, record) => (
                <div className={styles.reply}>{text}</div>
            )
        },{
            title: '回复内容',
            width: 400,
            dataIndex: 'reply',
            key: 'reply',
            render: (text, record) => (
                <div className={styles.reply}>{text}</div>
            )
        },{
            title: '发布时间',
            width: 150,
            dataIndex: 'createTime',
            key: 'createTime',
            render: (text, record) => (
                <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
            )
        },{
            title: '回复时间',
            width: 150,
            dataIndex: 'replyTime',
            key: 'replyTime',
            render: (text, record) => (
                <div>{ text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '尚未回复'}</div>
            )
        },{
            title: '操作',
            width: 175,
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button type="primary" onClick={this.handleSwitchModal.bind(this, true, record)} style={{marginRight: '20px'}}>回复</Button>
                    {
                        record.pass === 0 ?
                        <Popconfirm title="审核留言是否通过" onConfirm={this.handleReviewMessage.bind(this, record, 1)} onCancel={this.handleReviewMessage.bind(this, record, 2)} okText="通过" cancelText="不通过">
                            <Button type="danger" >审核</Button>
                        </Popconfirm>
                        :
                        (
                            record.pass ===1 ?
                            <span style={{marginLeft: 10, color: '#61b2a7'}}>已通过</span>
                            :
                            <span style={{marginLeft: 10, color: '#f04134'}}>已驳回</span>
                        )
                    }
                </div>
            ),
        }];

        const data = this.props.message.toJS()

        return (
            <div className={styles.container}>
                <Table rowKey='id' loading={this.state.isLoading} columns={columns} dataSource={data} />
                {
                    this.state.showReplyModal ? <ReplyModal message={this.state.message} closeModal={this.handleSwitchModal.bind(this, false)} /> : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    message: state.getIn(['message', 'messageList']),
})

const mapDispatchToProps = dispatch => ({
    getMessageList: bindActionCreators(getMessageList, dispatch),
    reviewMessage: bindActionCreators(reviewMessage, dispatch),
})

MessageContainer.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageContainer))
