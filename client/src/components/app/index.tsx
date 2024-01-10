import {useEffect, useState} from 'react'
import {useActions} from '../../hooks/useActions'
import Auth from '../auth'
import UserService from '../../services/UserService'
import {IUser} from '../../types/IUser'
import {useAppSelector} from '../../hooks/useAppSelector'
import './style.scss'

const App = () => {
    const {isLoading, isAuth, user} = useAppSelector(state => state.auth)
    const {checkAuth, logout} = useActions()
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth()
        }
    }, [])

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers()
            setUsers(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    if (!isAuth) {
        return (
            <div>
                <Auth />
                <button onClick={getUsers}>Получить пользователей</button>
            </div>
        )
    }

    return (
        <div>
            <h1>{isAuth ? `Пользователь авторизован ${user.username}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
            <button onClick={() => logout()}>Выйти</button>
            <div>
                <button onClick={getUsers}>Получить пользователей</button>
            </div>
            {users.map(user =>
                <div key={user.username}>{user.username}</div>
            )}
        </div>
    )
}

export default App