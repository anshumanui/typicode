import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { APIFailMsg, APIRequest } from './../utils';
import { LoadingBlock, ErrorBlock } from './../common/';


const Table = ({ data, itemId }) => {
	const headerData = ['Title', 'Body'];
	const matchedData = data.filter(item => item.userId === itemId);

	return (
		<div className="typicode-table">	
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
						matchedData.map((item, index) => {
							return (
								<tr key={ `tr_posts_${index}` }>
									<td>{ item.title }</td>
									<td>{ item.body }</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	)
};


const UserDetails = ({ id, name, username, email, address, phone, website, company, loadAPI }) => {
	return (
		<ul className="typicode-userDetails">
			<li>
				<button onClick={ () => loadAPI('posts') }>Posts</button>
				<button onClick={ () => loadAPI('todos') }>Todos</button>
				<button onClick={ () => loadAPI('albums') }>Albums</button>
			</li>
			<li>
				<h3>name</h3>
				<p>{ name }</p>
			</li>
			<li>
				<h3>email</h3>
				<p>{ email }</p>
			</li>
			<li>
				<h3>phone</h3>
				<p>{ phone }</p>
			</li>
			<li>
				<h3>username</h3>
				<p>{ username }</p>	
			</li>
			<li>
				<h3>website</h3>
				<p>{ website }</p>
			</li>
			<li>
				<h3>address</h3>
				<p>{ `${address.suite}, Street - ${address.street},` }</p>
				<p>{ `City - ${address.city}, Zipcode - ${address.zipcode}` }</p>
			</li>
			<li>
				<h3>company details</h3>
				<p>{ company.name }</p>
				<p><em>{ `${company.catchPhrase }, ${company.bs}` }</em></p>
			</li>
		</ul>
	)
};


const Users = () => {
	const location = useLocation();
	const itemId = location.state.id;

	const initAPIResponse = {
        data: null,
        error: null,
        loading: true
    };

    const [APIResponse, setAPIResponse] = useState(initAPIResponse);

	const loadAPI = async (category) => {
        try {
        	const abortController = new AbortController();
            const res = await APIRequest(abortController, 'GET', category);
            const response = await res.json();

            setAPIResponse((prevData) => ({
                ...prevData,
                data: response,
                loading: false
            }));

            return () => abortController.abort();
        } catch (error) {
            setAPIResponse((prevData) => ({
                ...prevData,
                error: APIFailMsg,
                data: null,
                loading: false
            }));
        }
	};

	useEffect(() => {
		loadAPI('posts');
	}, []);

	return (
		<section className="typicode-users">
			<h1>User Details</h1>

			<div className="typicode-usersPosts">
				<UserDetails {...location.state} {...{loadAPI}} />
				{
					APIResponse.loading ? (
						<LoadingBlock />
					) : (
						APIResponse.error ? (
							<ErrorBlock {...APIResponse} />
						) : (
							<Table {...APIResponse} {...{itemId}} />
						)
					)
				}
			</div>
		</section>
	)
};

export default Users;