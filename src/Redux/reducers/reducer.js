import { ADD_MAIN_NODE, ADD_NODE } from "../types/types"

const initialState = {
	tree: { route: '/main',  nodes: [], title: 'Main' }
}

export const mainReducer = (state = initialState, action) => {
	switch(action.type) {
		case ADD_NODE :
			const f = (tree = [], route) => {
				for(let i of tree) {
				  if(action.payload.parentRoute === i.route) {
					 i?.nodes.push({
						route: action.payload.route, 
						parentRoute: action.payload.parentRoute,
						 nodes: [],
						title: action.payload.title
					})
				  } else if(i.nodes.length) {
					 f(i.nodes, route)
				  }
				}
				return tree
			}
			return {...state, tree: {...state.tree, nodes: f(state.tree.nodes)}};

		case ADD_MAIN_NODE :
			return {...state, tree: {...state.tree, nodes: [...state.tree.nodes, action.payload]}};

		default: 
			return state;
	}
}