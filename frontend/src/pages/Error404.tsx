import React from 'react';
import { Link } from 'react-router-dom';
import { CircleGauge } from 'lucide-react';
import { Button } from '../components/ui/button';

const Error404: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Error 404</h1>
            <p>The page you are looking for does not exist.</p>
            <div style={{ marginTop: '20px' }}>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <Button>
                        <CircleGauge style={{ marginRight: '8px' }} />
                        Go to Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Error404;
