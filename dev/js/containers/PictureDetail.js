import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {populatePictures} from '../actions/pictures';

class PictureDetail extends React.Component{
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
		const picture = this.props.pictures.filter( (picture) => parseInt(this.props.match.params.id) === picture.id);
		if ( picture.length === 0 ){
			return null;
		}
		else{
			return (
				<div>
					<div className="top-banner link">
						<Link to="/">&#8617; Go back</Link>
					</div>
					<div className="picture-wrapper">
						<div className="picture-detail">
							<img src={picture[0].url} />
							<h2 className="picture-title">{picture[0].title.replace(/[-_]/g,' ')}</h2>
							<table>
								<tbody>
									<tr>
										<td className="left bold">Uploaded:</td>
										<td className="right">{picture[0].dateFormatted}</td>
									</tr>
									<tr>
										<td className="left bold">Size:</td>
										<td className="right">{picture[0].filesizeHumanReadable}</td>
									</tr>
								</tbody>
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

function matchDispatchToProps(dispatch){
	return bindActionCreators( {populatePictures: populatePictures}, dispatch );
}

export default connect(mapStateToProps, matchDispatchToProps)(PictureDetail);