import React from 'react'
import PropTypes from 'prop-types'
import styles from './BaseContainer.scss'
import Children from '../components/common/SubRoutes'
import { Menu, Icon, Button } from 'antd'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class BaseContainer extends React.Component {
	state = {
		breadthumb: '',
		selectedItem: [],
		openedSubMenu: [],
	}

	constructor(props) {
		super(props)
		this.handleSelectMenu = this.handleSelectMenu.bind(this)
		this.handleJumpToHome = this.handleJumpToHome.bind(this)
	}

	componentWillMount() {
		const pathname = this.props.location.pathname;
		const breadthumb = this.props.routes.find(r => r.path === pathname).name
		const selectedItem = [pathname.slice(1)]
		const openedSubMenu = [selectedItem[0].split('_')[0]]
		this.setState({breadthumb, selectedItem, openedSubMenu})
	}

	componentWillReceiveProps(nextProps) {
		const pathname = nextProps.location.pathname;
		const breadthumb = nextProps.routes.find(r => r.path === pathname).name
		this.setState({breadthumb})
	}

	handleSelectMenu(e) {
		const current = this.props.location.pathname;
		const to = '/' + e.key
		if (current !== to ) this.context.router.history.push(to)
	}

	handleJumpToHome() {
		this.context.router.history.push('/')
	}

	renderMenu() {
		const { selectedItem, openedSubMenu } = this.state
		return (
			<Menu
				onClick={this.handleSelectMenu}
				style={{ width: 200 }}
				defaultSelectedKeys={selectedItem}
		        defaultOpenKeys={openedSubMenu}
				theme="dark"
				mode="inline"
			>
				<SubMenu key="center" title={<span><Icon type="home" /><span>中心简介</span></span>}>
					<Menu.Item key="center_intro">中心概况</Menu.Item>
					<Menu.Item key="center_law">法律地位</Menu.Item>
					<Menu.Item key="center_certificate">授权证书</Menu.Item>
					<Menu.Item key="center_facility">重点设备</Menu.Item>
					<Menu.Item key="center_address">地理位置</Menu.Item>
				</SubMenu>
				<SubMenu key="notice" title={<span><Icon type="appstore" /><span>通知公告</span></span>}>
					<Menu.Item key="notice_add">新增文章</Menu.Item>
					<Menu.Item key="6">Option 6</Menu.Item>
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
					<span className={styles.left} onClick={this.handleJumpToHome}>
						公安部天津消防研究院管理系统
					</span>
					<span className={styles.right}>
						<span>门户网站</span>
						<span>注销</span>
					</span>
				</div>
				<div className={styles.body}>
					<div className={styles.menu}>
						{this.renderMenu()}
					</div>
					<div className={styles.content}>
						<div className={styles.breadthumb}>
							{this.state.breadthumb}
						</div>
						<div className={styles.children}>
							<Children routes={this.props.routes} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

BaseContainer.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

export default BaseContainer
