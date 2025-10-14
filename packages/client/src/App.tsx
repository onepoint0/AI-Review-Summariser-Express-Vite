import { useEffect, useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';

function App() {
    const [message, setMessage] = useState('');
    useEffect(() => {
        console.log('in use effect');
        fetch('/api/hello')
            .then((res) => res.json())
            .then((res) => setMessage(res.message));
    }, []);

    return (
        <div className="font-bold">
            <Button>{message}</Button>
        </div>
    );
}

export default App;
