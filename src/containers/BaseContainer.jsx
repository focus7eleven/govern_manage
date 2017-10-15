import React from 'react'
import styles from './BaseContainer.scss'
import Children from '../components/common/SubRoutes'
import PageHeaderComponent from '../components/navigate/PageHeaderComponent'
import Adervertisement from '../components/common/Advertisement'

class BaseContainer extends React.Component {
	render() {
		return (
			<div className={styles.container}>
				<div className={styles.inner}>
					<div className={styles.header}>
						<PageHeaderComponent />
					</div>
					<div className={styles.content}>
						<Children routes={this.props.routes} />
					</div>
					<div className={styles.footer}>
						国家固定灭火系统和耐火构件质量检验中心 版权所有 @2010 津ICP备05000541号 技术支持：公安部天津消防研究所网管中心
					</div>
				</div>
                <Adervertisement />
			</div>
		)
	}
}

export default BaseContainer
