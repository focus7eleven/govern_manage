import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginContainer from './user/LoginContainer'
import BaseContainer from './BaseContainer'

class AccessControl extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
		const isLogin = sessionStorage.getItem('accessToken')
		return isLogin ? <BaseContainer {...this.props}></BaseContainer> : <LoginContainer {...this.props}></LoginContainer>
    }
}

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {}
}

const LoginControlHOC = (Component) => connect(mapStateToProps, mapDispatchToProps)(AccessControl)

export default LoginControlHOC
