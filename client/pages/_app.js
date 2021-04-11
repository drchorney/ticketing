import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

// THIN wrapper around teh component we are trying to display on the screen
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser}/>
      <div className="container">
        <Component currentUser={currentUser} {...pageProps}  />
      </div>
    </div>
  );
};

// Arguments into App getInitialProps is different then a page
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser); // call the getINitialProps on a page, as they don't both run by default
  }

  return {
    pageProps,
    currentUser: data.currentUser,
  }
};

export default AppComponent;
