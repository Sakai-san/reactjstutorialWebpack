import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GridItem from './GridItem';
import {populatePictures} from '../actions/pictures';

class Grid extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		if( this.props.pictures.length === 0) {
			fetch("http://studybyyourself.com/wp-admin/admin-ajax.php?action=get_pictures")
				.then(response => response.json())
				.then(r => {
						if( r.success ){
							this.props.populatePictures( r.data );
						}
				});
		}
	}

	render(){
		const items = this.props.pictures.map( (el) => <GridItem key={el.id} picture={el} /> );
		return (
			<div className="pictures">
				{items}
			</div>
		);
	}
}

// when state change, component ll be rerendered. Become component's own prop
function mapStateToProps(state){
	return { pictures : state.pictures };
}

function matchDispatchToProps(dispatch){
	return bindActionCreators( {populatePictures: populatePictures}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Grid);