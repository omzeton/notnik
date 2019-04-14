import React from 'react';
import Auth from '../../containers/Auth/Auth';

import './Splash.css';

const splash = (props) => {
	return (
		<div className="Splash">
			<div className="Splash__Left">
				<div className="Splash__Left__Text">
					<h2>Notnik</h2>
					<h3>arguably simplest journal app ever</h3>
					<p>Have you ever had a train of thoughts? Or simply wanted to write down a memory for later? Or maybe you had something special happen to you and you wanted to write about it to get a better grasp of what just happened. Well, if you're not keen on writing in a smartphone app you've come to the right place. Simply register an account and start writing. We'll save everything for you. Never miss out on an opportunity to write t about what you want.</p>
				</div>
			</div>
			<div className="Splash__Right">
				<Auth />
			</div>
		</div>
	);
}

export default splash;