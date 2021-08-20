import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Cards from './Cards';

function Featured() {
	return (
		<div className='d-block mx-auto' style={{ width: '70%' }}>
			<h1 className='text-overide'>Let's order</h1>
			<Row>
				<Col md={3}>
					<Cards product='Ice Coffee Palm Sugar' price='27000' />
				</Col>
				<Col md={3}>
					<Cards product='Ice Coffee Green Tea' price='31000' />
				</Col>
				<Col md={3}>
					<Cards product='Hanami Latte' price='29000' />
				</Col>
				<Col md={3}>
					<Cards product='Clepon Coffee' price='28000' />
				</Col>
			</Row>
		</div>
	);
}

export default Featured;
