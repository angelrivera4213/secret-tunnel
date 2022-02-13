import createControllerView from './lib/createControllerView';

// Controller
import HomeController from '../controllers/HomeController';

// View
import HomeView from '../views/HomeView';


export default createControllerView(HomeController, HomeView);
