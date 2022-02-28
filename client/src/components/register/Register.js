import { useState } from 'react'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const registerUser = async () => {
      const response = await fetch('http://localhost:1337/api/register', {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        }),
      })

      const data = await response.json()
      console.log(data)
    }
  
    return (
      <>
      <div>
        <h1>Register</h1>
        <form onSubmit={registerUser}>
          <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
          <br />
          <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <br />
          <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <input type="submit" />
        </form>
      </div>
      </>
    );
  }

export default Register