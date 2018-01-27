import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import { addPicture } from '../actions/pictures';

class Upload extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			imageData : {},
			loading : false
		};
	}

	updateData( event ){
		this.setState({ imageData: event.target.files[0] });
	}

	upload(){
		this.setState({ loading : true });
		let fd = new FormData();
		fd.append( 'file', this.state.imageData );
		fetch("http://studybyyourself.com/wp-admin/admin-ajax.php?action=picture_upload",
			{	method: "POST",
				body: fd
			})
			.then(response => response.json())
			.then(r => {
					this.setState({ loading : false });
					if( r.success ){
						this.props.addPicture(r.data);
					}
				});
	}

	render(){
		const sendBtn = <button
			className="btn"
			disabled={this.state.loading ? true : false}
			onClick={this.upload.bind(this)}>
				Send
			</button>;
		const spinner = <div className={this.state.loading ? "spinner" : "hidden"}></div>;
		return (
			<div>
				<div className="top-banner link">
					<Link to="/">&#8617;Go back</Link>
				</div>
				<div className="buttons-panel">
					{/* comment in JSX :.bind(this) force the context to the current class */}
					<input className={"btn"} type="file" onChange={ this.updateData.bind(this) } />
					{sendBtn}
					{spinner}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return { pictures : state.pictures };
}

function matchDispatchToProps(dispatch){
	return bindActionCreators( {addPicture: addPicture}, dispatch );
}

export default connect(mapStateToProps, matchDispatchToProps)(Upload);