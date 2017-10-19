import React from 'react'
import styles from './CenterIntroContainer.scss'
import { Form, Input, Button } from 'antd'
import Editor from '../../components/common/Editor'

const FormItem = Form.Item;

class CenterIntroContainer extends React.Component {

    render() {
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 19 },
        };
        const buttonItemLayout = {
            wrapperCol: { span: 14, offset: 3 },
        }
        return (
            <div className={styles.container}>
                <Form layout="horizontal">
                    <FormItem
                        label="概况内容"
                        {...formItemLayout}
                    >
                        <Editor />
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

export default CenterIntroContainer
