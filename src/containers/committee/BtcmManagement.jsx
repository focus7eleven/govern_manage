import React from 'react'
import styles from './BtcmManagement.scss'
import PropTypes from 'prop-types'
import { Tag, Button, Table, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getAllBtcm, deleteBtcm } from '../../actions/committee'
import UpdateBtcmModal from './UpdateBtcmModal'
import moment from 'moment'

const BTC = ['一分委', '二分委', '三分委', '八分委', 'ISO/TC21/SC6']

class BtcmManagement extends React.Component {
    state = {
        isLoading: false,
        showModal: false,
        btcm: {},
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.setState({isLoading: true})
        this.props.getAllBtcm().then(res => this.setState({isLoading: false}))
    }

    handleSwitchModal = (visible, btcm) => {
        if (visible) {
            this.setState({showModal: true, btcm})
        } else {
            this.setState({showModal: visible})
        }
    }

    handleDeleteAdmin = (adminId) => {
        this.setState({isLoading: true})
        this.props.deleteBtcm(adminId).then(res => this.setState({isLoading: false}))
    }

    render() {
        const columns = [{
            title: '账户名',
            dataIndex: 'code',
            key: 'code',
        },{
            title: '密码',
            dataIndex: 'password',
            key: 'password',
        },{
            title: '真实姓名',
            dataIndex: 'realName',
            key: 'realName',
        },{
            title: '所属委员会',
            dataIndex: 'btcId',
            key: 'btcId',
            render: (text, record) => (
                <div>{BTC[record.btcId - 1]}</div>
            )
        },{
            title: '注册时间',
            dataIndex: 'registTime',
            key: 'registTime',
            render: (text, record) => (
                <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
            )
        },{
            title: '操作',
            width: 200,
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button type="primary" onClick={this.handleSwitchModal.bind(this, true, record)} style={{marginRight: '20px'}}>更新</Button>
                    <Popconfirm title="确认删除该管理员？" onConfirm={this.handleDeleteAdmin.bind(this, record.id)} okText="确认" cancelText="取消">
                        <Button type="danger" >删除</Button>
                    </Popconfirm>
                </div>
            ),
        }];

        const data = this.props.btcmList.toJS()

        return (
            <div className={styles.container}>
                <Table rowKey='id' loading={this.state.isLoading} columns={columns} dataSource={data} />
                {
                    this.state.showModal ? <UpdateBtcmModal btcm={this.state.btcm} closeModal={this.handleSwitchModal.bind(this, false)} /> : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    btcmList: state.getIn(['committee', 'btcmList']),
})

const mapDispatchToProps = dispatch => ({
    getAllBtcm: bindActionCreators(getAllBtcm, dispatch),
    deleteBtcm: bindActionCreators(deleteBtcm, dispatch),
})

BtcmManagement.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BtcmManagement))
