import { useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { useNavigate } from 'react-router';

const LoginPage = () => {
    const { handleChange, formValue } = useForm({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
      console.log(formValue);
    }, [formValue]);

    const handleSubmit = async (event) => {
      event.preventDefault();

      console.log("estoy en submit");
      try {
        const res = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValue)
        });
        
        if (res.ok) {
          navigate("/home");
        }else{
          alert("erro es:", error.message);
        }

      } catch (error) {
      }
    };

  return (
    <div>
        <form onSubmit={handleSubmit}>
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