import React from 'react'
import styles from './SearchInput.scss'
import {Icon} from 'antd'
export default class SearchInput extends React.Component {
	render(){
		return (
			<div className={styles.container}>
				<div className={styles.addonBefore}>站内搜索</div>
				<div className={styles.inputWrapper}>
				<input />
				</div>
				<div className={styles.addonAfter}><Icon type="search" /></div>
			</div>
		)
	}
}
