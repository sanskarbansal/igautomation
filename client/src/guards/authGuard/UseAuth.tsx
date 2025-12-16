import { useSelector } from 'react-redux';
import { AuthContext } from '../jwt/JwtContext';

const useAuth = () => useSelector((state) => state.authUser.auth);

export default useAuth;
