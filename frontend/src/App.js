import './App.css';
import Login from './Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Correction from './Correction/Correction';
import Create from './Correction/components/Create/Create';
import Update from './Correction/components/Update/Update';
import CorrectionPage from './Correction/components/CorrectionPage/CorrectionPage';

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route exact path='/login' element={<Login />} />
				<Route
					exact
					path='/correction/:id/:course/:type/:className'
					element={<Correction />}
				/>
				<Route
					exact
					path='/create/:id/:code/:name/:type'
					element={<Create />}
				/>
				<Route
					exact
					path='/update/:id/:code/:name/:type'
					element={<Update />}
				/>
				<Route exact path='/correction-page' element={<CorrectionPage />} />
			</Routes>
		</Router>
	);
}

export default App;
