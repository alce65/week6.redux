import { useAuth0 } from '@auth0/auth0-react';
import styles from './auth.module.css';

export function Auth() {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    console.log({ isAuthenticated });
    const title = 'Auth component';

    const handleLogin = () => {
        loginWithRedirect();
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className={styles.host}>
            <p>{title}</p>
            {!isAuthenticated && <button onClick={handleLogin}>Login</button>}
            {isAuthenticated && (
                <>
                    <div>
                        <img src={user?.picture} alt={user?.name} />
                        <h2>{user?.name}</h2>
                        <p>{user?.email}</p>
                    </div>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </div>
    );
}
