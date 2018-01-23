import React from 'react';
// import ReactRouter from 'react-router';
import Home from '../containers/Home';
/*
import Upload from '../containers/Upload';
import PictureDetail from '../containers/PictureDetail';
*/

class App extends React.Component{

    render(){
        return (
            <Home />
        );
    }
    {/*
	render(){
		return (
			<ReactRouter.Router>
				<ReactRouter.Route path="/" component={Home} />
				<ReactRouter.Route path="/upload" component={Upload} />
				<ReactRouter.Route path="/picture/:id" component={PictureDetail} />
			</ReactRouter.Router>
		);
    */}
}