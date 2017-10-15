import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './Button.scss'

class CommonButton extends React.Component {
    static propTypes = {
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        className: PropTypes.string,
        style: PropTypes.object
    }
    render() {
        const {height, width, content, className, style} = this.props
        return (
            <Button type="primary" {...this.props} className={classNames(className, styles.container)} style={_.extend({height,width}, style)}>
                {content}
            </Button>
        )
        
    }
}

export default CommonButton
