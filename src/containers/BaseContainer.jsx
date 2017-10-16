import React from 'react'
import styles from './BaseContainer.scss'
import Children from '../components/common/SubRoutes'
import { Menu, Icon, Button } from 'antd'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class BaseContainer extends React.Component {
	renderMenu() {
		return (
			<Menu
				style={{ width: 200 }}
				theme="dark"
				mode="inline"
			>
				<SubMenu key="sub1" title={<span><Icon type="home" /><span>中心简介</span></span>}>
					<Menu.Item key="1">中心概况</Menu.Item>
					<Menu.Item key="2">法律地位</Menu.Item>
					<Menu.Item key="3">授权证书</Menu.Item>
					<Menu.Item key="4">重点设备</Menu.Item>
					<Menu.Item key="5">地理位置</Menu.Item>
				</SubMenu>
				<SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
					<Menu.Item key="5">Option 5</Menu.Item>
					<Menu.Item key="6">Option 6</Menu.Item>
					<SubMenu key="sub3" title="Submenu">
						<Menu.Item key="7">Option 7</Menu.Item>
						<Menu.Item key="8">Option 8</Menu.Item>
					</SubMenu>
				</SubMenu>
				<SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
					<Menu.Item key="9">Option 9</Menu.Item>
				  	<Menu.Item key="10">Option 10</Menu.Item>
				  	<Menu.Item key="11">Option 11</Menu.Item>
				  	<Menu.Item key="12">Option 12</Menu.Item>
				</SubMenu>
			</Menu>
		)
	}

	render() {
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<span className={styles.left}>
						公安部天津消防研究院管理系统
					</span>
					<span className={styles.right}>
						<Button type="primary" size="large">门户网站</Button>
						<Button type="primary" size="large">注销</Button>
					</span>
				</div>
				<div className={styles.body}>
					<div className={styles.menu}>
						{this.renderMenu()}
					</div>
					<div className={styles.content}>
						<Children routes={this.props.routes} />
					</div>
				</div>
			</div>
		)
	}
}

export default BaseContainer
