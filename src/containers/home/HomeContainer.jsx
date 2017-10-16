import React from 'react'
import styles from './HomeContainer.scss'

class HomeContainer extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.welcome}>
                    欢迎登陆公安部天津消防研究院
                    <br />
                    后台管理系统
                </div>
            </div>
        )
    }
}

export default HomeContainer
