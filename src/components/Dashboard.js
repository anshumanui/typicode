import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APIFailMsg, APIRequest } from './../utils';
import { LoadingBlock, ErrorBlock } from './../common/';
import { UsernameSvg, PhoneSvg, EmailSvg, RightArrowSvg } from './../assets/icons/svg';



const Card = ({ ...item }) => {
	return (
		<li>
			<ul className="typicode-cardUpper">
				<li>
					<figure>
						<UsernameSvg />
					</figure>
					<div>
						<h3>username</h3>
						<p>{ item.username }</p>
					</div>
				</li>
				<li>
					<figure>
						<EmailSvg />
					</figure>
					<div>
						<h3>email</h3>
						<p>{ item.email }</p>
					</div>
				</li>
				<li>
					<figure>
						<PhoneSvg />
					</figure>
					<div>
						<h3>phone</h3>
						<p>{ item.phone }</p>
					</div>
				</li>
			</ul>
			<div className="typicode-cardLower">
				<Link to="/users" state={{...item}}>
					<span>Load more</span>
					<RightArrowSvg />
				</Link>
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
		<section className="typicode-dashboard">
			<h1>Dashboard</h1>
			{
				APIResponse.loading ? (
					<LoadingBlock />
				) : (
					APIResponse.error ? (
						<ErrorBlock {...APIResponse} />
					) : (
						<ul className="typicode-card">
							{
								(APIResponse.data).map(item => <Card {...item} key={ `card_${item.id}` } />)
							}
						</ul>
					)
				)
			}
		</section>
	)
};

export default Dashboard;