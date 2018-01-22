class GridItem extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			removing : false
		};
		this.remove=this.remove.bind(this); // force the context to the current class
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
					store.dispatch( {type: "REMOVE_PICTURE", payload: this.props.picture.id} );
				}
			});
	}

	render(){
		return (
			<div className={"picture " + ( this.state.removing ? "opaque" : "" )}>
				<span className="picture-remove" onClick={this.remove}>X</span>
				<ReactRouter.Link to={`/picture/${this.props.picture.id}`}>
					<img src={this.props.picture.url} />
				</ReactRouter.Link>
			</div>
		);
	}
}

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

class PictureDetail extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const picture = store.getState().pictures.filter( (picture) => parseInt(this.props.params.id) === picture.id);
		if ( picture.length === 0 ){
			return null;
		}
		else{
			return (
				<div>
					<div className="top-banner link">
						<ReactRouter.Link to="/">&#8617; Go back</ReactRouter.Link>
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
					<ReactRouter.Link to="/">&#8617;	Go back</ReactRouter.Link>
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

class Home extends React.Component{
	render(){
		return (
			<div>
				<div className="top-banner">
					<div className="counter">Uploaded : {store.getState().pictures.length}</div>
					<div className="uploadLink">
						<ReactRouter.Link to="/upload">Upload a picture</ReactRouter.Link>
					</div>
					<br className="clear" />
				</div>
				<Grid />
			</div>
		);
	}
}

class App extends React.Component{
	render(){
		return (
			<ReactRouter.Router>
				<ReactRouter.Route path="/" component={Home} />
				<ReactRouter.Route path="/upload" component={Upload} />
				<ReactRouter.Route path="/picture/:id" component={PictureDetail} />
			</ReactRouter.Router>
		);
	}
}

const render = () => {
	ReactDOM.render(
			<App />,
	    document.getElementById('root')
	);
}

// the store notifies when changes, so rerender when something in the store changed
store.subscribe( () => render() );

// render the application
render();
