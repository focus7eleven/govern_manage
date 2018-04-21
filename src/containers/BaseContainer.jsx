import React from 'react'
import PropTypes from 'prop-types'
import styles from './BaseContainer.scss'
import Children from '../components/common/SubRoutes'
import { Menu, Icon, Button } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { logout } from '../actions/common'
import { setNewArticleType } from '../actions/article'
import menuList from 'menu'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const CAN_ADD_ARTICLE_URL = menuList.map(m => {
	if (m.canAddArticle) {
		return '/index/' + m.route
	}
})

const NO_SUBMENU_CATEGORY = menuList.map(m => {
	if (!m.subMenu) {
		return m.name
	}
})

class BaseContainer extends React.Component {
	state = {
		breadthumb: '',
		selectedItem: [],
		openedSubMenu: [],
		allowedMenu: [],
	}

	constructor(props) {
		super(props)
		this.handleSelectMenu = this.handleSelectMenu.bind(this)
		this.handleJumpToHome = this.handleJumpToHome.bind(this)
	}

	componentWillMount() {
		const codeIds = JSON.parse(sessionStorage.getItem('codeIds'))
		const allowedMenu = menuList.filter(m => ~codeIds.indexOf(m.name))
		const pathname = this.props.location.pathname;
		const breadthumb = this.props.routes.find(r => r.path === pathname).name
		const isAllowed = ~(JSON.stringify(allowedMenu)).indexOf(breadthumb.split(' > ')[0])
		if (pathname != '/index' && !isAllowed) {
			window.location.replace('/#/index')
			window.location.reload()
		}
		const selectedItem = [pathname.split('/')[2]]
		let openedSubMenu = []
		if (selectedItem[0]) {
			openedSubMenu = [selectedItem[0].split('_')[0]]
		}
		this.setState({allowedMenu, breadthumb, selectedItem, openedSubMenu})
	}

	componentWillReceiveProps(nextProps) {
		const pathname = nextProps.location.pathname;
		const breadthumb = nextProps.routes.find(r => r.path === pathname).name
		const isAllowed = ~(JSON.stringify(this.state.allowedMenu)).indexOf(breadthumb.split(' > ')[0])
		if (pathname != '/index' && !isAllowed) {
			window.location.replace('/#/index')
			window.location.reload()
		} else {
			this.setState({breadthumb})
		}
	}

	handleSelectMenu(e) {
		const current = this.props.location.pathname;
        if (e.key === 'article_add') {
            this.props.setNewArticleType(-1)
        }
		const to = '/index/' + e.key
		if (current !== to ) this.context.router.history.push(to)
	}

	handleJumpToHome() {
		this.context.router.history.push('/')
	}

	handleLogout = () => {
		this.props.logout().then(res => {
			if (res) {
				this.context.router.history.push('/login')
			}
		})
	}

	handleJumpToWeb = () => {
		window.open('http://120.79.0.217:8929/#/')
	}

    handleAddNewArticle = (path) => {
		let type = NO_SUBMENU_CATEGORY[CAN_ADD_ARTICLE_URL.indexOf(path)]
    	const categoryId = this.props.category.find(i => i.name === type).id;
        this.props.setNewArticleType(categoryId)
        this.context.router.history.push('/index/article_add')
    }

	renderMenu() {
		const { selectedItem, openedSubMenu, allowedMenu } = this.state
		return (
			<Menu
				onClick={this.handleSelectMenu}
				style={{ width: 200 }}
				defaultSelectedKeys={selectedItem}
		        defaultOpenKeys={openedSubMenu}
				theme="dark"
				mode="inline"
			>
				{
					allowedMenu.map((m, index) => (
						~NO_SUBMENU_CATEGORY.indexOf(m.name) ?
						<Menu.Item key={m.route}><Icon type={m.type} />{m.name}</Menu.Item>
						:
						<SubMenu key={m.route} title={<span><Icon type={m.type} /><span>{m.name}</span></span>}>
							{
								m.name === '技术委员会' ?
								m.subMenu.map((sm, index) => (
									sm.subMenu ?
									<SubMenu key={sm.route} title={<span>{sm.name}</span>}>
										{
											sm.subMenu.map((ssm, index) => (
												<Menu.Item key={ssm.route}>{ssm.name}</Menu.Item>
											))
										}
									</SubMenu>
									:
									<Menu.Item key={sm.route}>{sm.name}</Menu.Item>
								))
								:
								m.subMenu.map((sm, index) => (
									<Menu.Item key={sm.route}>{sm.name}</Menu.Item>
								))
							}
						</SubMenu>
					))
				}
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
						<span onClick={this.handleJumpToWeb}>门户网站</span>
						<span onClick={this.handleLogout}>注销</span>
					</span>
				</div>
				<div className={styles.body}>
					<div className={styles.menu}>
						{this.renderMenu()}
					</div>
					<div className={styles.content}>
						<div className={styles.breadthumb}>
							{this.state.breadthumb}
                            {
                                ~(CAN_ADD_ARTICLE_URL.indexOf(this.props.location.pathname)) ?
                                <span onClick={this.handleAddNewArticle.bind(this, this.props.location.pathname)} style={{cursor: 'pointer', color: '#61b2a7', float: 'right', marginRight: 15}}>新增文章</span>
                                :
                                null
                            }
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

const mapStateToProps = state => ({
	isLogin: state.getIn(['common', 'isLogin']),
	category: state.getIn(['category', 'category']),
})

const mapDispatchToProps = dispatch => ({
    logout: bindActionCreators(logout, dispatch),
    setNewArticleType: bindActionCreators(setNewArticleType, dispatch),
})

BaseContainer.contextTypes = {
	router: PropTypes.shape({
		history: PropTypes.object.isRequired,
	}),
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseContainer))
