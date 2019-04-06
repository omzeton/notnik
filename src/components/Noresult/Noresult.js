import React from 'react';

import './Noresult.css';
	
function noresult(props) {

	let h2 = null,
		h3 = null;

	if (props.signed) {
		h2 = <h2>Connection error!</h2>;
		h3 = <h3>We couldn't fetch your entries. Please check your connection!</h3>;
	} else {
		h2 = <h2>Welcome!</h2>;
		h3 = <h3>Please log in or register a new account!<br/>This will be a <span className="Noresult--alert">full screen welcome page</span> soon!</h3>;
	}

	return (
		<div className="Noresult">
			{h2}
			{h3}
		</div>
	);
}

export default noresult;