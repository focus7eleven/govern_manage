import React from 'react'
import styles from './Editor.scss'
import E from 'wangeditor'

class Editor extends React.Component {
    state = {
        editorContent: ''
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const elem = this.refs.editorElem
        const editor = new E(elem)

        editor.customConfig.uploadImgShowBase64 = true

        editor.customConfig.pasteFilterStyle = false

        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.setState({
                editorContent: html
            })
            this.props.setContent(html)
        }
        editor.create()
    }

    render() {
        return (
            <div className={styles.container}>
                <div ref="editorElem" style={{textAlign: 'left'}}></div>
            </div>
        )
    }
}

export default Editor
