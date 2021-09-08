import React from 'react';
import {
	FaFacebook,
	FaTwitter,
	FaGoogle,
	FaInstagram,
	FaLinkedin,
	FaGithub,
} from 'react-icons/fa';

function Footer() {
	return (
		<footer
			className='text-center text-white'
			style={{
				marginTop: '300px',
				borderRadius: '10px 10px 0 0',
			}}
		>
			<div className=' bg-overide pt-4'>
				<section className='text-white'>
					<a
						className='btn btn-link btn-floating text-white m-1 btn-danger btn-overide'
						href='#!'
						role='button'
						data-mdb-ripple-color='dark'
					>
						<FaFacebook className='fab'></FaFacebook>
					</a>

					<a
						className='btn btn-link btn-floating text-white m-1 btn-danger btn-overide'
						href='#!'
						role='button'
						data-mdb-ripple-color='dark'
					>
						<FaTwitter className='fab'></FaTwitter>
					</a>

					<a
						className='btn btn-link btn-floating text-white m-1 btn-danger btn-overide'
						href='#!'
						role='button'
						data-mdb-ripple-color='dark'
					>
						<FaGoogle className='fab'></FaGoogle>
					</a>

					<a
						className='btn btn-link btn-floating text-white m-1 btn-danger btn-overide'
						href='#!'
						role='button'
						data-mdb-ripple-color='dark'
					>
						<FaInstagram className='fab fa-instagram'></FaInstagram>
					</a>

					<a
						className='btn btn-link btn-floating text-white m-1 btn-danger btn-overide'
						href='#!'
						role='button'
						data-mdb-ripple-color='dark'
					>
						<FaLinkedin className='fab'></FaLinkedin>
					</a>

					<a
						className='btn btn-link btn-floating text-white m-1 btn-danger btn-overide'
						href='#!'
						role='button'
						data-mdb-ripple-color='dark'
					>
						<FaGithub className='fab'></FaGithub>
					</a>
				</section>
			</div>

			<div className='text-center text-white bg-overide p-3'>
				© {new Date().getFullYear()} Copyright: WaysBucks - Ananda Farhan
			</div>
		</footer>
	);
}

export default Footer;
