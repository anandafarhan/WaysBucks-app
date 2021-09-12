import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

function Cards(props) {
	const [state, dispatch] = useContext(AppContext);
	const route = useHistory();

	function formatPrice({ price }) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0,
		}).format(price);
	}

	function handleClick(id) {
		if (state.isLogin === true) {
			route.push(`/product/${id}`);
		} else {
			dispatch({ type: 'MODAL_LOGIN' });
		}
	}

	return (
		<Card
			className='mx-1 my-3 card-overide grow'
			style={{ filter: 'drop-shadow(0px 5px 3px rgba(200,200,200,70%))' }}
			onClick={() => handleClick(props.dataId)}
		>
			<Card.Img
				className='img-card bg-white'
				style={{ borderRadius: '10px' }}
				variant='top'
				src={props.image}
				alt={props.product}
			/>
			<Card.Body>
				<Card.Title style={{ textDecoration: 'none' }}>{props.product}</Card.Title>
				<Card.Text className='fs-6' style={{ textDecoration: 'none' }}>
					<span>{formatPrice(props)}</span>
				</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default Cards;
