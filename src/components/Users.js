import { Fragment, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { APIFailMsg, APIRequest } from './../utils';
import { LoadingBlock, ErrorBlock } from './../common/';


const Table = ({ data, itemId, activeCategory }) => {
	const headerData = {
		posts: ['S.No.', 'Title', 'Body'],
		todos: ['S.No.', 'Title', 'Completed'],
		albums: ['S.No.', 'Title']
	};

	const matchedData = data.filter(item => item.userId === itemId);
	const defaultCount = 10;

	return (
		<div className="typicode-table">
			<p className="typicode-tableInfo">
				<span>Showing { defaultCount } out of { matchedData.length } records</span>
				<select name="recordsCount">
					<option value="10" selected>10</option>
					<option value="20" selected>20</option>
					<option value="50" selected>50</option>
					<option value="100" selected>100</option>
				</select>
			</p>
			<table>
				<thead>
					<tr>
						{
							headerData[activeCategory].map((item, index) => <th key={ `th_${index}` }>{ item }</th>)
						}
					</tr>
				</thead>
				<tbody>
					{
						matchedData.map((item, index) => {
							return (
								<tr key={ `tr_posts_${index}` }>
									<td>{ index + 1 }</td>
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


const UserDetails = ({ id, name, username, email, address, phone, website, company, activeCategory, updateCategory }) => {
	const categories = ['posts', 'todos', 'albums'];

	return (
		<ul className="typicode-userDetails">
			<li>
				{
					categories.map((item, index) => {
						return (
							<Fragment key={ `button_categories_${index}` }>
								<button 
									onClick={ () => updateCategory(item) } 
									className={ item === activeCategory ? 'typicode-activeBtn' : '' }>
									{ item }
								</button>
							</Fragment>
						)
					})
				}
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

	const [activeCategory, setActiveCategory] = useState('posts');

	const updateCategory = (category) => {
		setActiveCategory(category);
	}

	const initAPIResponse = {
        data: null,
        error: null,
        loading: false
    };

    const [APIResponse, setAPIResponse] = useState(initAPIResponse);

	const loadAPI = async () => {
        try {
        	setAPIResponse((prevData) => ({
                ...prevData,
                data: null,
                loading: true
            }));

        	const abortController = new AbortController();
            const res = await APIRequest(abortController, 'GET', activeCategory);
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
		loadAPI(activeCategory);
	}, [activeCategory]);

	return (
		<section className="typicode-users">
			<h1>User Details</h1>

			<div className="typicode-usersPosts">
				<UserDetails {...location.state} {...{activeCategory}} {...{updateCategory}} />
				{
					APIResponse.loading ? (
						<LoadingBlock />
					) : (
						APIResponse.error ? (
							<ErrorBlock {...APIResponse} />
						) : (
							APIResponse.data ? (
								<Table {...APIResponse} {...{itemId}} {...{activeCategory}} />
							) : (null)
						)
					)
				}
			</div>
		</section>
	)
};

export default Users;