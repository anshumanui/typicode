import { Fragment, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { APIFailMsg, APIRequest } from './../utils';
import { LoadingBlock, ErrorBlock } from './../common/';
import Details from './Details';


const Table = ({ data, activeCategory, loadDetails }) => {
	const headerData = {
		posts: ['S.No.', 'Title', 'Body', 'Action'],
		todos: ['S.No.', 'Title', 'Completed'],
		albums: ['S.No.', 'Title', 'Action']
	};

	const defaultCount = 10;
	const optionValues = [10, 20, 50, 100];

	return (
		<div className="typicode-table">
			<p className="typicode-tableInfo">
				<span>Showing { data.length > defaultCount ? defaultCount : data.length } out of { data.length } records</span>
				<div>
					Showing
					<select name="recordsCount">
						{
							optionValues.map((item, index) => {
								return (
									<option value={ item } key={ `option_${index}` }>{ item }</option>
								)
							})
						}
					</select>
					items per page
				</div>
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
						data.map((item, index) => {					
							if (Object.keys(headerData)[0] === activeCategory) {
								return (
									<tr key={ `tr_posts_${index}` }>
										<td>{ index + 1 }</td>
										<td>{ item.title }</td>
										<td>{ item.body }</td>
										<td><span onClick={ () => loadDetails(item) }>View Comments</span></td>
									</tr>
								)
							}

							if (Object.keys(headerData)[1] === activeCategory) {
								return (
									<tr key={ `tr_todos_${index}` }>
										<td>{ index + 1 }</td>
										<td>{ item.title }</td>
										<td>{ item.completed ? 'lala' : 'pula'}</td>
									</tr>
								)
							}

							if (Object.keys(headerData)[2] === activeCategory) {
								return (
									<tr key={ `tr_albums_${index}` }>
										<td>{ index + 1 }</td>
										<td>{ item.title }</td>
										<td><span onClick={ () => loadDetails(item) }>View Photos</span></td>
									</tr>
								)
							}
						})
					}
				</tbody>
			</table>
		</div>
	)
};


const UserDetails = ({ name, username, email, address, phone, website, company, activeCategory, updateCategory }) => {
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

	const [showParent, setShowParent] = useState(true);
	const [childDetails, setChildDetails] = useState(null);
	const [activeCategory, setActiveCategory] = useState('posts');

	const updateCategory = (category) => {
		setActiveCategory(category);
		setShowParent(true);
		setChildDetails(null);
	};

	const loadDetails = (childItems) => {
		setShowParent(false);
		setChildDetails(childItems);
	};

	const removeDetails = () => {
		setShowParent(true);
		setChildDetails(null);
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

            const APIname = `users/${itemId}/${activeCategory}`;

        	const abortController = new AbortController();
            const res = await APIRequest(abortController, 'GET', APIname);
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
		loadAPI();
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
							APIResponse.data  ? (
								showParent ? (
									<Table {...APIResponse} {...{activeCategory}} {...{loadDetails}} />
								) : (
									<Details {...{childDetails}} {...{activeCategory}} {...{removeDetails}} />
								)
							) : (null)
						)
					)
				}
			</div>
		</section>
	)
};

export default Users;