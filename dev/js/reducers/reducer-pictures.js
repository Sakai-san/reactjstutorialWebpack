// reducer : change a specific part of the store (here the pictures part)
export default function (state=[], action){
	if( action.type === "INITIALIZATION" ){
		return action.payload;
	}
	else if( action.type === "ADD_PICTURE" ){
		return [...state, action.payload]; // must be a pure function
	}
	else if( action.type === "REMOVE_PICTURE" ){
		return state.filter( (pic) => action.payload !== pic.id); // must be a pure function
	}
	return state;
}
