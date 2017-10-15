import React from 'react'
import styles from './Navigation.scss'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import notice from 'publicRes/img/notice.gif'
import navigation from 'navigation'
import SearchInput from '../common/SearchInput'
const cx = classnames.bind(styles)

class NavigationTab extends React.Component {
	static propTypes = {
		title:PropTypes.string,
		link:PropTypes.string,
		isActive:PropTypes.bool
	}
	static defaultProps = {
		subNav:[]
	}
	handleMouseEnter = () => {
		this.props.onMouseEnter()
	}
	render(){
		const {subNav} = this.props
		return (
			<div className={cx('tabContainer',{
				'tabContainer-enter':this.props.isActive
			})} onMouseEnter={this.handleMouseEnter}>
				<a>{this.props.title}</a>
			</div>
		)
	}
}

class SubNavigation extends React.Component {
	static propTypes = {
		navTabItem:PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			activeKey:-1
		}
	}
	handleMouseEnter = (key) => {
		const {navTabItem} = this.props
		const subNav = navTabItem.children||[]
		this.props.onChooseSubItem(subNav[key])
		this.setState({
			activeKey:key
		})
	}
	render(){
		const {navTabItem} = this.props
		const type = navTabItem.type
		const subNav = navTabItem.children||[]
		if(type=='rolling'){
			return (
				<div className={styles['subNavigation-rolling']}>
					<img src={notice} />滚动公告：
					<div className={styles.rollingContainer}>
					{subNav.map((v,k) => {
						return (<a className={styles.rollLink} key={k}>{k!=0?' | ':null}{v.title}</a>)
					})}
					</div>
				</div>)
		}else{
			return (
				<div className={styles.subNavigation}>
					{subNav.map((v,k) => {
						return <NavigationTab
						isActive={this.state.activeKey==k}
						onMouseEnter={this.handleMouseEnter.bind(this,k)}
						title={v.title} key={k} subNav={v.children}/>
					})}
				</div>
			)
		}
	}
}

class ThirdNavigationPanel extends React.Component {
	static propTypes = {
		thrirdNavigation:PropTypes.array
	}
	render(){
		const {thrirdNavigation} = this.props
		console.log(thrirdNavigation)
		return (
			<div className={styles.thirdNavigationContainer}>
			{thrirdNavigation.map((v,k) => {
				return <div className={styles.thirdNavigationItem}>{v.title}</div>
			})}
			</div>
		)
	}
}

export default class Navigation extends React.Component {
	static propTypes = {
		navigation:PropTypes.array
	}
	static defaultProps = {
		navigation:navigation
	}
	constructor(){
		super()
		this.state = {
			activeKey:-1,
			thirdNavigationItem:{}
		}
	}
	handleMouseEnter = (key) => {
		this.setState({
			activeKey:key
		})
	}
	handleChooseSubItem = (subItem) => {
		this.setState({
			thirdNavigationItem:subItem
		})
	}
	render(){
		const navigation = this.props.navigation
		const navTabItem = navigation[this.state.activeKey]||{}
		return (
			<div className={styles.container}>
				<div className={styles.navigationWrapper}>
					<div className={styles.navigation}>
						{navigation.map((v,k) => {
							return <NavigationTab
							isActive={this.state.activeKey==k}
							onMouseEnter={this.handleMouseEnter.bind(this,k)}
							title={v.title} key={k} subNav={v.children}/>
						})}
					</div>
					<div className={styles.searchBar}>
						<SearchInput />
					</div>
				</div>
				<div className={styles.subNav}>
					<SubNavigation navTabItem={navTabItem} onChooseSubItem={this.handleChooseSubItem}/>
				</div>
				{(this.state.thirdNavigationItem.children&&this.state.thirdNavigationItem.children.length>0)?
					(<div className={styles.dropDownPanel}>
						<ThirdNavigationPanel thrirdNavigation={this.state.thirdNavigationItem.children}/>
				</div>):null}
			</div>
		)
	}
}
