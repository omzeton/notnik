import React from 'react';

import './Loader.css';
	
function loader() {
	return (
		<div className="Loader">
			<div className="lds-ripple"><div></div><div></div></div>
		</div>
		
	);
}

export default loader;