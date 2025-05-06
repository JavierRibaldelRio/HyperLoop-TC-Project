import { ModeToggle } from '@/components/mode-toggle';
import React from 'react';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Bienvenido a Hyperloop</h1>
            <p>Explora las funcionalidades de nuestro proyecto.</p>


            <ModeToggle />
        </div>
    );
};

export default Home;
