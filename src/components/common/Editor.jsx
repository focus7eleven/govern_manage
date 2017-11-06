import React from 'react'
import styles from './Editor.scss'
import E from 'wangeditor'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { uploadImage } from '../../actions/article'

class Editor extends React.Component {
    state = {
        editor: null
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const toolbar = this.refs.div1
        const text = this.refs.div2
        const editor = new E(toolbar, text)
        const _this = this

        editor.customConfig.uploadImgShowBase64 = true
        // editor.customConfig.debug = true
        editor.customConfig.customUploadImg = function (files, insert) {
            const res = _this.props.upload(files[0])
            res.then(url => insert(url))
        }


        editor.customConfig.pasteFilterStyle = false

        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.props.onContentChange(html)
        }
        editor.create()
        editor.txt.html(this.props.initialContent || '')

        this.setState({editor})
    }

    componentWillReceiveProps(nextProps) {
        const editor = this.state.editor
        editor.txt.html(nextProps.initialContent || '')
        this.setState({editor})
    }

    render() {
        return (
            <div>
                <div ref="div1" className={styles.toolbar}>
                </div>
                <div ref="div2" className={styles.text} style={{textAlign: 'left'}}>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    upload: bindActionCreators(uploadImage, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Editor))
