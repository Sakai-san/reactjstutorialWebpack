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
