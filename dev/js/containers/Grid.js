import React from 'react';
import {connect} from 'react-redux';


class Grid extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		fetch("http://studybyyourself.com/wp-admin/admin-ajax.php?action=get_pictures")
	     .then(response => response.json())
	     .then(r => {
				 if( r.success ){
					 store.dispatch( {type: "INITIALIZATION", payload: r.data} );
				 }
			 });
	}

	render(){
		const items = store.getState().pictures.map( (el) => <GridItem key={el.id} picture={el} /> );
		return (
			<div className="pictures">
				{items}
			</div>
		);
	}
}

// when state change, component ll be rerendered. Become component's own prop
function mapStateToProps(state){

}

export default connect(mapStateToProps)(Grid);