import React from 'react'
import styles from './CommitteeContentOnly.scss'
import { Form, Input, Button } from 'antd'
import Editor from '../../components/common/Editor'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getCommittee, updateCommittee } from '../../actions/committee'

const FormItem = Form.Item;

class CommitteeContentOnly extends React.Component {
    state = {
        initialContent: '',
        committeeId: 1,
        type: 'desc',
        typeName: {
            btcBrief: '分委简介',
            connection: '联系方式',
            cms: '目前管理的标准',
            crs: '制修订中的标准'
        }
    }

    constructor(props) {
        super(props)
        this.handleContentChange = this.handleContentChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        const params = this.props.contentName.split(',')
        const committeeId = params[0]
        const type = params[1]
        this.setState({committeeId, type})
        this.props.getCommittee(committeeId).then(res => {
            this.setState({initialContent: this.props.committeeDetail[type]})
            // if(type === 'desc') {
            //     this.setState({initialContent: this.props.committeeDetail.btcbrief})
            // } else if (type === 'contact') {
            //     this.setState({initialContent: this.props.committeeDetail.connection})
            // }
        })
    }

    handleContentChange(content) {
        this.props.form.setFieldsValue({content})
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const committee = this.props.committeeDetail
                let formData = new FormData()
                formData.append('selective', 1)
                formData.append('id', this.state.committeeId)
                formData.append('btcName', committee.btcName)
                formData.append('serialNumber', committee.serialNumber)
                formData.append('shortName', committee.shortName)
                formData.append('cms', committee.cms)
                formData.append('crs', committee.crs)
                formData.append('btcBrief', committee.btcBrief)
                formData.append('connection', committee.connection)
                formData.set(this.state.type, values.content)
                // if (this.state.type === 'desc') {
                //     formData.append('btcbrief', values.content)
                //     formData.append('connection', committee.connection)
                // } else if (this.state.type === 'contact') {
                //     formData.append('btcbrief', committee.btcBrief)
                //     formData.append('connection', values.content)
                // }
                this.props.updateCommittee(formData).then(res => {
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
                        label={this.state.typeName[this.state.type]}
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

const WrappedContentOnlyForm = Form.create()(CommitteeContentOnly);

const mapStateToProps = state => ({
    committeeDetail: state.getIn(['committee', 'committeeDetail'])
})

const mapDispatchToProps = dispatch => ({
    getCommittee: bindActionCreators(getCommittee, dispatch),
    updateCommittee: bindActionCreators(updateCommittee, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedContentOnlyForm))
