import React from 'react';
import { Image } from 'react-bootstrap';

function Hero() {
	return (
		<div className='my-4'>
			<Image
				className='d-block mx-auto'
				src='../assets/img/Jumbotron.png'
				alt='...'
				fluid
			/>
		</div>
	);
}

export default Hero;
