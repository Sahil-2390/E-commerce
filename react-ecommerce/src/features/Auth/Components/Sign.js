import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectLoggedInUser,createUserAsync,
  selectError
 
} from '../AuthSlice';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
export  default function Sign() {
  const{register,handleSubmit,watch,formState:{errors}}=useForm();
  const user =useSelector(selectLoggedInUser)
  
  const error=useSelector(selectError)
  
  const dispatch = useDispatch();

  return (
  <>
 {user && <Navigate to="/" replace={true}></Navigate> }
 <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
          src="/Dukaan1.png"
            className="mx-auto h-40 w-auto"
          />
          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate onSubmit={handleSubmit((data)=>{
            dispatch(createUserAsync({email:data.email,
              password:data.password,
              addresses:[],
              role:"user"
              //TODO:this role can be directly given on backend
            }))
            
            console.log(data)
          })} 
           className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                 {...register("email",{
                  required:"email is required",
                  pattern:{
                  value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message:"email is not valid"}})}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
                {errors.email && <p className='text-red-500'>{errors.email.message}</p>} 
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password",{
                    required:true,
                    pattern:{
                    value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    message:`- at least 8 characters\n
                    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                    - Can contain special characters`
                    }})}
                  type="password"
                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
               {errors.password && <p className='text-red-500'>{errors.password.message}</p>} 
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
                </label>
            
              </div>
              <div className="mt-2">
                <input
                  id="confirmpassword"
                 {...register("confirmpassword",{required:"confirm password is required",
                  validate:(value,formValues)=>value===formValues.password || "password not matching"               
                 })}
                  type="password"
             
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmpassword && <p className='text-red-500'>{errors.confirmpassword.message}</p>} 
              </div>
              {error && <p className='text-red-500'>{error.message}</p>} 
            </div>

            <div>
              <button
                type="submit"
      className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
             Login
            </Link>
          </p>
        </div>
      </div> 
  </>
  );
}
