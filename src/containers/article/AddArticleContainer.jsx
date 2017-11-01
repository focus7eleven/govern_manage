import React from 'react'
import styles from './AddArticleContainer.scss'
import Editor from '../../components/common/Editor'
import { Form, Input, Button, Select, Checkbox, DatePicker } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getCategory } from '../../actions/category'


const FormItem = Form.Item;
const Option = Select.Option;

class AddArticleContainer extends React.Component {
    state = {
        categories: ['通知公告', '行业动态'],
    }

    componentWillMount() {
        this.props.getCategory()
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 19 },
        };
        const buttonItemLayout = {
            wrapperCol: { span: 14, offset: 3 },
        }

        const { categories } = this.props

        return (
            <div className={styles.container}>
                <Form layout="horizontal">
                    <FormItem
                        label="标题"
                        {...formItemLayout}
                    >
                        <Input placeholder="请输入标题" />
                    </FormItem>
                    <FormItem
                        label="所属版块"
                        {...formItemLayout}
                    >
                        <Select placeholder="请选择所属版块" dropdownStyle={{zIndex: 1000000}} >
                            {categories.map((c, index) => (
                                <Option key={c.id} value={c.name}>{c.name}</Option>
                            ))}
                        </Select>
                    </FormItem>
                    <FormItem
                        label="是否操作"
                        {...formItemLayout}
                    >
                        <Checkbox>置顶</Checkbox>
                        <Checkbox>标红</Checkbox>
                    </FormItem>
                    <FormItem
                        label="来源"
                        {...formItemLayout}
                    >
                        <Input placeholder="请输入来源" />
                    </FormItem>
                    <FormItem
                        label="发布时间"
                        {...formItemLayout}
                    >
                        <DatePicker
                            showTime
                            defaultValue={moment()}
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="Select Time"
                        />
                    </FormItem>
                    <FormItem
                        label="内容"
                        {...formItemLayout}
                    >
                        <Editor />
                    </FormItem>
                    <FormItem
                        label="新闻图片"
                        {...formItemLayout}
                    >
                        <Input placeholder="input placeholder" />
                    </FormItem>
                    <FormItem
                        label="附件"
                        {...formItemLayout}
                    >
                        <Input placeholder="input placeholder" />
                    </FormItem>

                    <FormItem {...buttonItemLayout}>
                        <Button type="primary">提交</Button>
                        <Button style={{ marginLeft: 8 }}>重置</Button>
                    </FormItem>
                </Form>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddArticleContainer))
