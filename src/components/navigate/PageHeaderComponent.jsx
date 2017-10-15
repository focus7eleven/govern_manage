import React from 'react'
import styles from './PageHeaderComponent.scss'
import Navigation from '../common/Navigation'

export default class PageHeaderComponent extends React.Component {
	render(){
		return (
			<div className={styles.container}>
				<Navigation />
			</div>
		)
	}
}
