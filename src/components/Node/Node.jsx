import {Link} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { ADD_MAIN_NODE, ADD_NODE } from "../../Redux/types/types";

const Main = ({tree, main}) => {

	const dispatch = useDispatch()
	const [route, setRoute] = useState('');
	const [title, setTitle] = useState('');

	const addNodes = (e) => {
		if(tree.nodes.filter(i => i.title === title).length) {
			alert('Страница с таким title уже существует');
		} else if(tree.nodes.filter(i => i.route === `${tree.route}/${route}`).length) {
			alert('Страница с таким route уже существует')
		} else if(title && route) {
			dispatch(
				{
					type: main ? ADD_MAIN_NODE : ADD_NODE,
					payload: {title: title, route: `${tree.route}/${route}`, parentRoute: tree.route, nodes: []
				}})
				setTitle('');
				setRoute('');
		} else if(route) {
			alert('Ведите route')
		} else if(title) {
			alert('Введите title')
		}  else {
			alert('Введите route и title')
		}
		e.preventDefault ();
	}

	return (
		<div className='wrapper'>
			<header className='header' style={{background: tree?.nodes.length ? '#2ad44b' : '#4067b3'}}>
				<div className='title'>{tree?.title}</div>
				{
					!main
					&&
					<Link to={tree?.parentRoute}>
						<button className='button'>Перейти к родительскому узлу</button>
					</Link>
				}
			</header>
			<form onSubmit={addNodes} className='form'>
				<div className='form-el'>
					<p>Title</p>
					<input value={title} onChange={(e) => setTitle(e.target.value)} />
				</div>
				<hr />
				<div className='form-el'>
					<p>Route</p>
					<input value={route} onChange={(e) => setRoute(e.target.value)} />
				</div>
				<hr />
				<input className="button-submit" type='submit' value='Добавить' />
			</form>
			<div className='node-list'>
				{
					tree?.nodes.length 
					? 
					<ol>
						{tree.nodes.map((i, index) => <Link key={index} to={i.route}><li>{i.title}</li></Link>)}
					</ol>
					:
					<p>Нет дочерних узлов</p>
				}
			</div>
		</div>
	);
}

export default Main;
