import { useForm } from '../hooks/useForm';
import { useEffect } from 'react';  

const LoginPage = () => {
    const { handleChange, handleReset,formValue  } = useForm({
        username: '',
        password: ''
    })

  return (
    <div>
        <form>
            <label>Username</label>
            <input 
            name="username" 
            value={formValue.username} 
            type="text" 
            onChange={handleChange}
            required
            />
            <br/>
            <label>Password</label>
            <input 
            name="password" 
            value={formValue.password} 
            type="password" 
            onChange={handleChange}
            required
            />
            <br/>
            <button type="submit">Iniciar Secion</button>
        </form>
         
    </div>
  )
};

export default LoginPage;