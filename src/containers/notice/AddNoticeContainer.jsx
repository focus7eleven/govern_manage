import React from 'react'
import styles from './AddNoticeContainer.scss'
import { Form, Input, Button, Select, Checkbox, DatePicker } from 'antd'
import moment from 'moment'

const FormItem = Form.Item;
const Option = Select.Option;

class AddNoticeContainer extends React.Component {
    state = {
        categories: ['通知公告', '行业动态'],
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 19 },
        };
        const buttonItemLayout = {
            wrapperCol: { span: 14, offset: 3 },
        }

        const { categories } = this.state

        return (
            <div className={styles.container}>
                <Form layout="horizontal">
                    <FormItem
                        label="标题"
                        {...formItemLayout}
                    >
                        <Input placeholder="input placeholder" />
                    </FormItem>
                    <FormItem
                        label="所属版块"
                        {...formItemLayout}
                    >
                        <Select defaultValue="通知公告" >
                            {categories.map((c, index) => (
                                <Option key={c} value={c}>{c}</Option>
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
                        <Input placeholder="input placeholder" />
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
                        <Input placeholder="input placeholder" />
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

export default AddNoticeContainer
