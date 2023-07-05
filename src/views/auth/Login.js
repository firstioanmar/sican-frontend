import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Login() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState([]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const LoginHandler = async (e) => {
    // stop browser's default behavior of reloading on form submit
    e.preventDefault();
    Swal.fire({
      title: 'Mohon tunggu!',
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);

    await axios
      .post('http://localhost:1500/login', formData)
      .then((response) => {
        localStorage.setItem('uuid', response.data.response.uuid);
        localStorage.setItem('username', response.data.response.nama);
        localStorage.setItem('alamat', response.data.response.alamat);
        localStorage.setItem('password', response.data.response.password);
        localStorage.setItem('role_id', response.data.response.role);
        Swal.fire({
          title: 'Login Success!',
          icon: 'success',
          timer: 2500,
          showConfirmButton: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.hideLoading();
          },
        }).then(history.push('/home'));
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: 'Failed!',
          text: 'Invalid username or password',
          icon: 'warning',
          timer: 2500,
          showConfirmButton: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.hideLoading();
          },
        }).then(setValidation(error.response.data));
      });
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-3 py-3">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-2xl uppercase font-bold">Login</h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={LoginHandler}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 py-2">
                      <input className="hidden js-password-toggle" id="toggle" type="checkbox" />
                      <label
                        className="bg-blueGray-200 hover:bg-blueGray-600 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
                        htmlFor="toggle"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <i className="fa fa-eye-slash" />
                        ) : (
                          <i className="fa fa-eye" />
                        )}
                      </label>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      name="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                      autoComplete="password"
                    />

                    {validation.password && (
                      <div className="bg-red-200 border border-red-400 text-red-700 mt-2 px-4 py-3 rounded relative">
                        {validation.password[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        defaultChecked
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-lightBlue-800 text-white active:bg-lightBlue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      <i className="fas fa-sign-in-alt mr-2"></i>Login
                    </button>
                  </div>
                  <div className="text-center mt-6">
                    <Link
                      to="/register"
                      className="bg-yellow-500 text-white active:bg-yellow-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      <i className="fa fa-edit mr-2"></i>Register
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
