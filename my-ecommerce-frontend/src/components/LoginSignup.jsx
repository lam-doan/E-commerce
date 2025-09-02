import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

const AuthForm = () => {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async () => {
        const endpoint = mode === 'login' ? 'login' : 'register';

        try {
            const res = await fetch(`https://e-commerce-gl2f.onrender.com/auth/${endpoint}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({_id: email, password: password})
            });
            
            const data = await res.json();

            if (!res.ok && res.status === 409 && mode === 'register') {
                console.error(data.message);
                setMode('login');
                return;
            }
            
            //Save token
            localStorage.setItem('token', data.token);

            //Redirect to hompage
            navigate('/');
            
        } catch(err) {
            console.error('Auth error', err);
        }
    };

    return (
        <div className='auth-container'>
            <div className='tabs'>
                <button 
                    className={mode === 'login' ? 'tab active' : 'tab'}
                    onClick={() => setMode('login')}>Sign In
                </button>
                <button
                    className={mode === 'register' ? 'tab active' : 'tab'}
                    onClick={() => setMode('register')}
                >Create an account
                </button>
            </div>

            <div className='form'>
                <div className='form-group'>
                    <label>Email</label>
                    <input id='email' type='email' value={email} onChange={e=>setEmail(e.target.value)} required/>
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input id='password' type='password' value={password} onChange={e=>setPassword(e.target.value)} minLength={8} required/>
                </div>
                <button className='submit-btn' onClick={() => handleSubmit()}>
                {mode === 'login' ? 'Sign In' : 'Register'}
            </button>
            </div>

        </div>
    );
};

export default AuthForm;