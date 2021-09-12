import React from 'react';
import { Image } from 'react-bootstrap';

function Hero() {
	return (
		<div
			className='mx-auto my-4 position-relative text-white'
			style={{
				width: '70%',
				filter: 'drop-shadow(0px 10px 3px rgba(200,200,200,70%))',
			}}
		>
			<Image
				className='d-block'
				style={{ borderRadius: '10px', width: '90%' }}
				src={`${process.env.PUBLIC_URL}/assets/img/hero/Jumbotron.png`}
				alt='...'
			/>
			<div className='position-absolute' style={{ top: '4rem', left: '5rem', width: '45%' }}>
				<h1 className='mb-4 fw-bolder'>WAYSBUCKS</h1>
				<p className='mb-4 fs-4 lead'>Things are changing but we're still here for you</p>
				<p className='mb-5'>
					We have temporarily closed our in-store cafes, but select grocery and drive-thru locations
					remaining open.
					<br />
					<strong>Waysbucks</strong> Drivers is also available.
				</p>
				<a href='#featured'>
					<button type='button' className='btn btn-outline-light'>
						Let's Order...
					</button>
				</a>
			</div>
			<div className='position-absolute' style={{ top: '2rem', right: '-3rem', width: '45%' }}>
				<Image
					className='d-block'
					style={{ borderRadius: '10px', width: '90%' }}
					src={`${process.env.PUBLIC_URL}/assets/img/hero/coffee.png`}
					alt='...'
				/>
			</div>
		</div>
	);
}

export default Hero;
