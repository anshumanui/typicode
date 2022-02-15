import { useState, useEffect } from 'react';
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
					<div>
						<h3>Name</h3>
						<p>{ name }</p>
					</div>
					<div>
						<h3>username</h3>
						<p>{ username }</p>
					</div>
				</li>
				<li>
					<h3>email</h3>
					<p>{ email }</p>
				</li>
				<li>
					<h3>website</h3>
					<p>{ website }</p>
				</li>
				<li>
					<h3>phone</h3>
					<p>{ phone }</p>
				</li>
			</ul>
			<div className="typicode-cardLower">
				<div>
					<h3>address</h3>
					<p>{ `${address.street}, ${address.suite}, ${address.city}, Zipcode - ${address.street}` }</p>
				</div>
				<div>
					<h3>Company information</h3>
					<p>{ company.name }</p>
					<p>{ company.catchPhrase }</p>
					<p>{ company.bs }</p>
				</div>
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

    const loadAPI = async () => {
        try {
            const res = await APIRequest('GET', 'users');
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
        loadAPI();
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