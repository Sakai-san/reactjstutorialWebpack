import React from 'react';
// import ReactRouter from 'react-router';
import Home from '../containers/Home';
/*
import Upload from '../containers/Upload';
import PictureDetail from '../containers/PictureDetail';
*/
require('../../scss/styles.scss');

class App extends React.Component{

    render(){
        return (
            <Home />
        );
    }
}

export default App;