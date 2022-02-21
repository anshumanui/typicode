import { Fragment, useState, useEffect } from 'react';
import { APIFailMsg, APIRequest } from './../utils';
import { LoadingBlock, ErrorBlock } from './../common/';


const Table = ({ data, activeCategory }) => {
	const headerData = {
		posts: ['S.No.', 'Name', 'Email', 'Body'],
		albums: ['S.No.', 'Title', 'Thumbnail Url', 'Url']
	};

	const defaultCount = 10;
	const optionValues = [10, 20, 50, 100];

	return (
		<div className="typicode-table">
			<div className="typicode-tableInfo">
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
			</div>
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
									<tr key={ `tr_comments_${index}` }>
										<td>{ index + 1 }</td>
										<td>{ item.name }</td>
										<td>{ item.email }</td>
										<td>{ item.body }</td>
									</tr>
								)
							}

							if (Object.keys(headerData)[1] === activeCategory) {
								return (
									<tr key={ `tr_photos_${index}` }>
										<td>{ index + 1 }</td>
										<td>{ item.title }</td>
										<td>
											<figure>
												<img src={ item.thumbnailUrl } alt="Thumbnail" />
											</figure>
										</td>
										<td>{ item.url }</td>
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


const CategoryDetails = ({ title, body, activeCategory }) => {
	return (
		<ul>
			<li>
				<h3>title</h3>
				<p>{ title }</p>
			</li>
			{
				activeCategory === 'posts' ? (
					<li>
						<h3>body</h3>
						<p>{ body }</p>
					</li>
				) : (null)
			}
		</ul>
	)
};


const Details = ({ childDetails, activeCategory }) => {
	const itemId = childDetails.id;
	const APIEndPoint = activeCategory === 'posts' ? 'comments' : 'photos';

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

            const APIname = `${activeCategory}/${itemId}/${APIEndPoint}`;

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
	}, []);

	return (
		<div className="typicode-details">
			<CategoryDetails {...childDetails} {...{activeCategory}} />
			{
				APIResponse.loading ? (
					<LoadingBlock />
				) : (
					APIResponse.error ? (
						<ErrorBlock {...APIResponse} />
					) : (
						APIResponse.data ? (
							<Table {...APIResponse} {...{activeCategory}} />
						) : (null)
					)
				)
			}
		</div>
	)
};

export default Details;