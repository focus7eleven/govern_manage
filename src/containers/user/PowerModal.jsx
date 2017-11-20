import React from 'react'
import styles from './PowerModal.scss'
import { Row, Col, Checkbox, Modal, Form, Input, Button, Select } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { addPower, deletePower } from '../../actions/user'
import menu from 'menu'
import _ from 'lodash'

const plainOptions = menu.map(m => m.name)

const FormItem = Form.Item
const Option = Select.Option
const CheckboxGroup = Checkbox.Group;

class PowerModal extends React.Component {
    state = {
        initial: [],
        checkedList: [],
        indeterminate: true,
        checkAll: false,
    }

    componentWillMount() {
        const codeIds = this.props.power.toJS()
        const checkedList = codeIds.map(i => plainOptions[i-1])
        this.setState({checkedList, initial: checkedList})
    }

    handleOk = (e) => {
        e.preventDefault();
        const initial = this.state.initial
        const update = this.state.checkedList
        const intersection = _.intersection(update, initial)
        const removed = _.xor(initial, intersection)
        const added = _.xor(update, intersection)
        const addedId = added.map(i => plainOptions.indexOf(i) + 1)
        const removedId = removed.map(i => plainOptions.indexOf(i) + 1)
        if (addedId.length > 0) {
            let addForm = new FormData()
            addForm.append('adminId', this.props.adminId)
            addForm.append('codeIds', addedId.join(','))
            this.props.addPower(addForm)
        }
        if (removedId.length > 0) {
            let removeForm = new FormData()
            removeForm.append('adminId', this.props.adminId)
            removeForm.append('codeIds', removedId.join(','))
            this.props.deletePower(removeForm)
        }
        this.props.closeModal()
    }

    handleCancel = (e) => {
        this.props.closeModal()
    }


    onChange = (checkedList) => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll: checkedList.length === plainOptions.length,
        });
    }

    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    }

    render( ) {
        return (
            <Modal
				title='权限管理'
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
			>
                <div>
                    <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Checkbox
                            indeterminate={this.state.indeterminate}
                            onChange={this.onCheckAllChange}
                            checked={this.state.checkAll}
                        >
                            选择全部
                        </Checkbox>
                    </div>
                    <br />
                    <CheckboxGroup className={styles.option} options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                    {/* <CheckboxGroup onChange={this.onChange} value={this.state.checkedList}>
                        <Row>
                            {
                                plainOptions.map((o, index) => (
                                    <Col key={index} span={8}><Checkbox value={index+1}>{o}</Checkbox></Col>
                                ))
                            }
                        </Row>
                    </CheckboxGroup> */}
                </div>
			</Modal>
        )
    }
}

const mapStateToProps = state => ({
    // category: state.getIn(['article', 'category']),
})

const mapDispatchToProps = dispatch => ({
    deletePower: bindActionCreators(deletePower, dispatch),
    addPower: bindActionCreators(addPower, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PowerModal))
