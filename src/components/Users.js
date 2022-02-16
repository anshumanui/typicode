import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { APIFailMsg, APIRequest } from './../utils';


const Table = ({ data }) => {
	const headerData = ['Title', 'Body'];

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
			</table>
		</div>
	)
};





const UserDetails = ({ id, name, username, email, address, phone, website, company }) => {
	return (
		<ul className="typicode-userDetails">
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
	const { itemId } = location.state;

	const initAPIResponse = {
        data: null,
        error: null,
        loading: true
    };

    const [APIResponse, setAPIResponse] = useState(initAPIResponse);

	const loadAPI = async (abortController) => {
        try {
            const res = await APIRequest(abortController, 'GET', 'posts');
            const response = await res.json();

            setAPIResponse((prevData) => ({
                ...prevData,
                data: response,
                loading: false
            }));
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
		const abortController = new AbortController();

		loadAPI(abortController);

        return () => abortController.abort();
	}, []);

	return (
		<section className="typicode-users">
			<h1>User Details</h1>

			<div className="typicode-usersPosts">
				{
					APIResponse.error ? (
						<h1>Sabu kichi fati gala</h1>
					) : (
						<>
							<UserDetails {...location.state} />
							<Table {...APIResponse} />
						</>
					)
				}
			</div>
		</section>
	)
};

export default Users;