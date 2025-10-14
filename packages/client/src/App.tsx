import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [message, setMessage] = useState('');
    useEffect(() => {
        console.log('in use effect');
        fetch('/api/hello')
            .then((res) => res.json())
            .then((res) => setMessage(res.message));
    }, []);

    return <div className="font-bold">{message}</div>;
}

export default App;
