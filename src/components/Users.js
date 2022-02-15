import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { APIRequest } from './../utils';


const Table = ({ data, loadPosts }) => {
	const headerData = ['Name', 'Phone', 'Email', 'Username', 'Website'];

	return (	
		<table>
			<thead>
				<tr>
					{
						headerData.map((item, index) => <th key={ `th_${index}` }>{ item }</th>)
					}
				</tr>
			</thead>
			<tbody>
				{
					data.map(item => {
						return (
							<tr key={ `tr_body_${item.id}` } onClick={ () => loadPosts(item.id) }>
								<td>{ item.name }</td>
								<td>{ item.phone }</td>
								<td>{ item.email }</td>
								<td>{ item.username }</td>
								<td>{ item.website }</td>
							</tr>
						)
					})
				}
			</tbody>
		</table>
	)
};


const Post = () => {
	return (
		<h1>Posts here</h1>
	)
}


const Dashboard = ({ data, error }) => {
	const loadPosts = async (itemId) => {
        try {
            const res = await APIRequest('GET', 'posts');
            const response = await res.json();

            
        } catch (error) {
            
        }
	};

	return (
		<section>
			<h1>Data Table Goes here</h1>
			{
				error ? (
					<h1>Sabu kichi fati gala</h1>
				) : (
					<>
						<Table {...{data}} {...{loadPosts}} />
						<Post />
					</>
				)
			}
		</section>
	)
};


const Posts = () => {
	const location = useLocation();
  	const { userid } = location.state;

	return (
		<section>
			<h1>User: {userid}</h1>
		</section>
	)
};

export default Posts;