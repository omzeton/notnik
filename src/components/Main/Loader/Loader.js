import React from 'react';

import './Loader.css';
	
const Loader = props => {

	const loaderStyles = props.auth ? {position: 'relative'} : {position: 'absolute', top: '50%', transform: 'translateY(-50%)'};
	return (
		<div className="Loader" style={loaderStyles}>
			<div className="lds-ripple"><div></div><div></div></div>
		</div>
		
	);
}

export default Loader;