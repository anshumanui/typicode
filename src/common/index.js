import { ErrorSvg } from './../assets/icons/svg';


export const ErrorBlock = () => {
    return (
    	<div className="typicode-errorBlock">
	        <figure>
	            <ErrorSvg />
	        </figure>
	        <h1>Sorry! We are facing some trouble fetching data from the server right now.</h1>
            <h2>We would like to suggest few things to make it work.</h2>
            <ul>
            	<li>Try reloading the web page.</li>
            	<li>Clear the browser cache and load the page again.</li>
            	<li>Server may be under maintenance. Try visiting the page after a while.</li>
            </ul>
	    </div>
    )
};


export const LoadingBlock = () => {
    return (
    	<div className="typicode-loadingBlock">
	        <figure>
	            <img src={ `${process.env.PUBLIC_URL}/loader.svg` } alt="loader" />
	        </figure>
	    </div>
    )
};