import { ModeToggle } from '@/components/mode-toggle';
import React from 'react';

const About: React.FC = () => {
    return (
        <div>
            <h1>Acerca de Hyperloop</h1>
            <p>Este proyecto está diseñado para revolucionar el transporte con tecnología de vanguardia.</p>


            <ModeToggle />
        </div>
    );
};

export default About;
