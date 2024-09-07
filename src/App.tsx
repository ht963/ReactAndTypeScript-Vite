import axios from 'axios';
import User from './Users';
import { FC, useEffect ,useState } from 'react';
import {AppProps, Users } from './App.types';



const App: FC<AppProps> = ({ title }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Users[]>([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    document.title = title; // Set the document title based on the `title` prop
  }, [title]);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('https://randomuser.me/api/?results=10');
      console.log(data);
      setUsers(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    `${user.name.first} ${user.name.last}`.toLowerCase().includes(username)
  );

  return (
    <div id='mainArena'>
      <header>
        <h1>{title}</h1>
        <input id='inputtextbox' type='text' placeholder='Search...' onChange={handleChange} />
        <button id='showbutton' onClick={handleClick}>Show Users</button>
      </header>
      <main>
        {isLoading && <p>Loading...</p>}
        <ul className='user-list'>
          {filteredUsers.map(({ login, name, email }) => (
            <li key={login.uuid} className='user-item'>
              <User name={name} email={email} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;