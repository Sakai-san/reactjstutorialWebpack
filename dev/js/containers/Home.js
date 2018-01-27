import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Grid from '../containers/Grid';

class Home extends React.Component{
	render(){
		return (
			<div>
				<div className="top-banner">
					<div className="counter">Uploaded : {this.props.pictures.length}</div>
					<div className="uploadLink">
						<Link to="/upload">Upload a picture</Link>
					</div>
					<br className="clear" />
				</div>
				<Grid />
			</div>
		);
	}
}

// when state change, component ll be rerendered. Become component's own prop
function mapStateToProps(state){
    return { pictures : state.pictures };
}

export default connect(mapStateToProps)(Home);