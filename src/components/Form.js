import React, { useState, useEffect } from 'react';

const Form = () => {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    occupation: '',
    state: ''
  });

  const [occupations, setOccupations] = useState(null);
  const [states, setStates] = useState(null);

  const url = 'https://frontend-take-home.fetchrewards.com/form';

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();

    setStates(data.states);
    setOccupations(data.occupations);

    setUser({
      ...user,
      occupation: data.occupations[0],
      state: data.states[0].name
    })
  }

  useEffect(() => {
    fetchData()
  },[])

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
          occupation: user.occupation,
          state: user.state
        })
    })
      .then(res => {
        if(res.status === 201) {
          setTimeout(() => {
            alert('User has been created');
          }, 1000);
        }
      })
      .then(() => {
        setUser({
          ...user,
          name: '',
          email: '',
          password: ''
        })
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      { (occupations && states) &&
        <form onSubmit={handleSubmit} className='form'>
          <label>
            Full Name
            <br />
            <input
              type='text'
              name='name'
              value={user.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <br />
            <input
              type='text'
              name='email'
              value={user.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password
            <br />
            <input
              type='password'
              name='password'
              value={user.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Occupation
            <br />
            <select name='occupation' onChange={handleChange}>
              {occupations.map((occupation, i) => <option value={occupation} key={i}>{occupation}</option>)}
            </select>
          </label>
          <label>
            State
            <br />
            <select name='state' onChange={handleChange}>
              {states.map((state, i) => <option value={state.name} key={i}>{state.abbreviation}</option>)}
            </select>
          </label>
          <br />
          <input type='submit' value='Submit' />
        </form>
      }
    </div>
  )
}

export default Form;