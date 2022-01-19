import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

const App = () => {
    const [images, setImages] = useState();
    const [modalState, setModalState] = useState();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => console.log(data);
    
    useEffect(() => {
        console.time('API Timer');
      
        fetch('images?limit=12')
            .then(res => res.json())
            .then(data => {
                console.log('Success:', data);
                setImages(data);
                console.timeEnd('API Timer');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

  return (
    <div className='app'>
        <div className='outer-container'>
            <div className='grid-container'>
            {
                images && images.map(img => (
                    <div key={img.id} className='block' >
                        <img className='motor-picture' src={`${img.url}.jpg`} alt={`${img.alt_description}`} onClick={() => setModalState(`${img.url}.jpg`)} />
                        <img className='profile-picture' src={`${img.user.profile_image}.webp`} alt={`${img.user.name}`} />
                    </div>
                ))
            }
            </div>

            {
                modalState &&
                    <div className='modal-container'>
                        <div className='modal-overlay' onClick={() => setModalState(null)}></div>
                        <img className='modal-picture' src={`${modalState}`} alt='' />
                    </div>
            }
            
            <div className='form-container'>
                <h2>Contact us</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">Name</label>
                    <input id="name" aria-invalid={errors.name ? "true" : "false"} {...register('name', { required: true, maxLength: 30 })} />

                    {errors.name && errors.name.type === "required" && (
                        <span role="alert">Name is required</span>
                    )}

                    <label htmlFor="email">Email</label>
                    <input id="email" aria-invalid={errors.email ? "true" : "false"} {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} />
      
                    {errors.email && errors.email.type === "required" && (
                        <span role="alert">Email is required</span>
                    )}

                    {errors.email && errors.email.type === "pattern" && (
                        <span role="alert">Email is not formatted correctly</span>
                    )}

                    <label htmlFor="dob">Date of Birth (DD/MM/YYYY)</label>
                    <input id="dob" aria-invalid={errors.dob ? "true" : "false"} {...register('dob', { required: true, pattern: /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/ })} />
      
                    {errors.dob && errors.dob.type === "required" && (
                        <span role="alert">Date of Birth is required</span>
                    )}

                    {errors.dob && errors.dob.type === "pattern" && (
                        <span role="alert">Date of Birth is not formatted correctly (DD/MM/YYYY)</span>
                    )}

                    <label htmlFor="color">Favorite Colour</label>
                    <input id="color" aria-invalid={errors.color ? "true" : "false"} {...register('color', { required: true })} />
      
                    {errors.color && errors.color.type === "required" && (
                        <span role="alert">Favorite colour is required</span>
                    )}

                    <label htmlFor="salary">Salary</label>
                    <input type="range" aria-invalid={errors.salary ? "true" : "false"} id="salary" min="0" max="200000" step="10000" />
      
                    {errors.salary && errors.salary.type === "required" && (
                        <span role="alert">Salary is required</span>
                    )}
      
                    <input type="submit" />
                </form>
            </div>
        </div>
    </div>
  );
}

export default App;
