import { useState } from 'react'
import { useActions } from '../../hooks/useActions.js'
import './style.scss'

const Auth = () => {
    const {login, registration} = useActions()

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return (
        <div>
            <input
                onChange={e => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder='Username'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Пароль'
            />
            <button onClick={() => login({username, password})}>
                Логин
            </button>
            <button onClick={() => registration({username, password})}>
                Регистрация
            </button>
        </div>
    );
}

export default Auth