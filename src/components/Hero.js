import React from 'react';
import { Image } from 'react-bootstrap';
import HeroImg from '../assets/Jumbotron.svg';

function Hero() {
	return (
		<div className='my-4'>
			<Image className='d-block mx-auto' src={HeroImg} alt='...' fluid />
		</div>
	);
}

export default Hero;
