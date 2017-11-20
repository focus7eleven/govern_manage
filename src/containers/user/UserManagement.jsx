import React from 'react'
import styles from './UserManagement.scss'
import PropTypes from 'prop-types'
import { Tag, Button, Table, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getAdminList, deleteAdmin, getPowerList } from '../../actions/user'
import PowerModal from './PowerModal'
import moment from 'moment'

class UserManagement extends React.Component {
    state = {
        adminId: 0,
        power: [],
        isLoading: false,
        showModal: false,
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.setState({isLoading: true})
        this.props.getAdminList().then(res => this.setState({isLoading: false}))
    }

    handleSwitchModal = (visible, adminId) => {
        if (visible) {
            this.setState({isLoading: true})
            this.props.getPowerList(adminId).then(res => {
                this.setState({showModal: true, adminId, power: this.props.powerList, isLoading: false})
            })
        } else {
            this.setState({showModal: visible})
        }
    }

    handleDeleteAdmin = (adminId) => {
        this.setState({isLoading: true})
        this.props.deleteAdmin(adminId).then(res => this.setState({isLoading: false}))
    }

    render() {
        const columns = [{
            title: '管理员名称',
            dataIndex: 'adminName',
            key: 'adminName',
        },{
            title: '密码',
            dataIndex: 'password',
            key: 'password',
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
                    <Button type="primary" onClick={this.handleSwitchModal.bind(this, true, record.adminId)} style={{marginRight: '20px'}}>权限管理</Button>
                    <Popconfirm title="确认删除该管理员？" onConfirm={this.handleDeleteAdmin.bind(this, record.adminId)} okText="确认" cancelText="取消">
                        <Button type="danger" >删除</Button>
                    </Popconfirm>
                </div>
            ),
        }];

        const data = this.props.adminList.toJS()

        return (
            <div className={styles.container}>
                <Table rowKey='adminId' loading={this.state.isLoading} columns={columns} dataSource={data} />
                {
                    this.state.showModal ? <PowerModal adminId={this.state.adminId} power={this.state.power} closeModal={this.handleSwitchModal.bind(this, false)} /> : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    adminList: state.getIn(['user', 'adminList']),
    powerList: state.getIn(['user', 'powerList']),
})

const mapDispatchToProps = dispatch => ({
    deleteAdmin: bindActionCreators(deleteAdmin, dispatch),
    getAdminList: bindActionCreators(getAdminList, dispatch),
    getPowerList: bindActionCreators(getPowerList, dispatch),
})

UserManagement.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserManagement))
