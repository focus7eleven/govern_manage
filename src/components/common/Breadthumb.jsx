import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styles from './Breadthumb.scss'

class Breadthumb extends React.Component {
	static propTypes = {
		breadthumb: PropTypes.object.isRequired,
	}

	render() {
		const breadthumb = this.props.breadthumb
		return (
			<div className={styles.container}>
                当前位置：
				{
					breadthumb.map((b, index) => {
                        const suffix = index < breadthumb.size - 1 ? '>' : '';
                        return <span key={index}> {b.name + " " + suffix} </span>
					})
				}
			</div>
		)
	}
}

const mapState = state => ({
	breadthumb: state.getIn(['common', 'breadthumb']),
})

export default withRouter(connect(mapState)(Breadthumb))
