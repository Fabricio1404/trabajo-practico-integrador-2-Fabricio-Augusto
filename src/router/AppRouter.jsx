import { Routes, Route } from 'react-router';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ResgisterPage from '../pages/RegisterPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<ResgisterPage />} />
        </Routes>
    );
}   
    

export default AppRouter;