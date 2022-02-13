// import so bundler picks it up
import './styles/global.css';
import App from './App';
import AppContext from './context/AppContext';

// Initial controller view
import Home from './controllerViews/Home';

// Stores
import HomeStore from './stores/HomeStore';

AppContext.registerStores([
	HomeStore
]);
const componentContext = AppContext.getComponentContext();

const app = new App({
	context: componentContext
});

app.pushController(Home());