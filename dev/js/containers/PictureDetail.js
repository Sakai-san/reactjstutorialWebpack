import React from 'react';
import {connect} from 'react-redux';


class PictureDetail extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const picture = PaymentResponse.pictures.filter( (picture) => parseInt(this.props.params.id) === picture.id);
		if ( picture.length === 0 ){
			return null;
		}
		else{
			return (
				<div>
					<div className="top-banner link">
						{/*<ReactRouter.Link to="/">&#8617; Go back</ReactRouter.Link> */}
					</div>
					<div className="picture-wrapper">
						<div className="picture-detail">
							<img src={picture[0].url}/>
							<h2 className="picture-title">{picture[0].title.replace(/[-_]/g,' ')}</h2>
							<table>
								<tr><td className="left bold">Uploaded:</td><td className="right">{picture[0].dateFormatted}</td></tr>
								<tr><td className="left bold">Size:</td><td className="right">{picture[0].filesizeHumanReadable}</td></tr>
							</table>
						</div>
					</div>
				</div>
			);
		}
	}
}

function mapStateToProps(state){
    return { pictures : state.pictures };
}

export default connect(mapStateToProps)(PictureDetail);