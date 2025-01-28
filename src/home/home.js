import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../navdrawer/Header';

function Home() {
    const user = useSelector((state) => state.user);
    

    return (
        <div>
            <Header />
            <h1>Home</h1>
            {user.name && <h2>Welcome, {user.name}!</h2>}
        </div>
    );
}

export default Home;