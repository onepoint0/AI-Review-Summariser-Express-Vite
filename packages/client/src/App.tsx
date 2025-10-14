import { useEffect } from 'react';
import './App.css';

function App() {
    useEffect(() => {
        console.log('in use effect');
        fetch('/api/hello')
            .then((res) => res.json())
            .then((res) => console.log('res = ', res));
    }, []);

    return <></>;
}

export default App;
