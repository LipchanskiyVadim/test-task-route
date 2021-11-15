import { Routes, Route } from "react-router-dom";
import Node from './components/Node/Node';
import { useSelector } from 'react-redux';

function App() {

	const tree = useSelector(state => state.tree);
	let nodes  = [];

	const recurse = (obj = []) => {
		for(let node of obj) {
			if(node.nodes.length) {
				 nodes.push(
				 <Route key={nodes.length + 1} path={node.route} element={<Node tree={node}  main={false} />} />
				 )
				 recurse(node.nodes);
			} else {
				nodes.push(
				<Route key={nodes.length + 1} path={node.route} element={<Node tree={node}  main={false} />} />
				)
			}
		}
		return nodes.map(i => i)
	}

	return (
	<div>
		<Routes>
			<Route path="/main" element={<Node tree={tree} main={true} />} />
			{recurse(tree.nodes)}
			<Route path="*" element={<Node tree={tree} main={true}/>} />
		</Routes>
	</div>
  );
}

export default App;
