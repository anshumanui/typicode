import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APIFailMsg, APIRequest } from './../utils';


const Loader = () => {
	return (
		<figure>
            <img src={ `${process.env.PUBLIC_URL}/loader.svg` } alt="loader" />
        </figure>
	)
}


const Card = ({ id, name, username, email, address, phone, website, company }) => {
	return (
		<li>
			<ul className="typicode-cardUpper">
				<li>
					<h3>username</h3>
					<p>{ username }</p>
				</li>
				<li>
					<h3>email</h3>
					<p>{ email }</p>
				</li>
				<li>
					<h3>phone</h3>
					<p>{ phone }</p>
				</li>
			</ul>
			<div className="typicode-cardLower">
				<Link to="/users" state={{ userid: `${id}` }}>Load more</Link>
			</div>
		</li>
	)
};


const Dashboard = () => {
	const initAPIResponse = {
        data: null,
        error: null,
        loading: true
    };

    const [APIResponse, setAPIResponse] = useState(initAPIResponse);

    const loadAPI = async (abortController) => {
        try {
            const res = await APIRequest(abortController, 'GET', 'users');
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
		<section>
			<h1>Dashboard</h1>
			{
				APIResponse.loading ? (
					<Loader />
				) : (
					<ul className="typicode-card">
						{
							(APIResponse.data).map(item => <Card {...item} key={ `card_${item.id}` } />)
						}
					</ul>
				)
			}
		</section>
	)
};

export default Dashboard;