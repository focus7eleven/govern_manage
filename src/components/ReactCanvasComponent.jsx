import React from 'react'
// import pdf from '../public/科社论文.pdf'
import ReactDOM from 'react-dom'
import PDFJSComponent from './PDFJSComponent'

export default class ReactCanvasCompose extends React.Component {
	constructor(){
		super()
		this.state = {
			url:''
		}
	}
	componentDidMount(){
		// console.log("-->:",pdf)
		// let fileReader = new FileReader()
		// fileReader.onload = function(e){
		// 	console.log("--->:",e.target.value)
		// 	this.setState({
		// 		url:e.target.value
		// 	})
		// }
		// fileReader.readAsDataURL(new File(pdf))
	}
	componentDidUpdate(){

	}
	render(){
		return (
			<div>
			<input type='file' onChange={(e) => {
				this.setState({
					file:e.target.files[0]
				})
			}} />
			<div>
			<PDFJSComponent file={this.state.file}/>
			</div>
			</div>
		)
	}
}
