import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from  'react-router-dom';
import {removePicture} from '../actions/pictures';

class GridItem extends React.Component{
	constructor(props){
		super(props);
		this.state = { removing : false };
		this.remove = this.remove.bind(this); // force the context to the current class
	}

	remove(){
		this.setState({ removing : true });
		fetch("http://studybyyourself.com/wp-admin/admin-ajax.php?action=picture_remove",
			{	method: "POST",
				headers : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
				body: `id=${this.props.picture.id}`
			})
			.then(response => response.json())
			.then(r => {
				this.setState({ removing : false });
				if( r.success ){
					this.props.removePicture( this.props.picture.id );
				}
			});
	}

	render(){
		return (
			<div className={"picture " + ( this.state.removing ? "opaque" : "" )}>
				<span className="picture-remove" onClick={this.remove}>X</span>
				<Link to={`/picture/${this.props.picture.id}`}>
					<img src={this.props.picture.url} />
				</Link>
			</div>
		);
	}
}

function mapStateToProps(state){
    return { pictures : state.pictures };
}

function matchDispatchToProps(dispatch){
	return bindActionCreators( {removePicture: removePicture}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GridItem);