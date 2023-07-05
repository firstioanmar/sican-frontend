import { React, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Register() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alamat, setAlamat] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const RegisterHandler = async (e) => {
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

    formData.append('nama', username);
    formData.append('password', password);
    formData.append('alamat', alamat);
    formData.append('role', 2);

    await axios
      .post('http://localhost:1500/registrasi', formData, { timeout: 5000 })
      .then((response) => {
        Swal.fire({
          title: 'Registration successful!',
          icon: 'success',
          timer: 2500,
          showConfirmButton: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.hideLoading();
          },
        }).then(history.push('/login'));
      })
      .catch((error) => {
        if (error.code === 'ECONNABORTED') {
          Swal.fire({
            title: 'Failed!',
            text: 'Please check internet connectivity!',
            icon: 'warning',
            timer: 2500,
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.hideLoading();
            },
          });
        } else {
          Swal.fire({
            title: 'Failed!',
            text: 'Username already exists',
            icon: 'warning',
            timer: 2500,
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.hideLoading();
            },
          });
        }
      });
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-xl uppercase font-bold">Sign up</h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={RegisterHandler}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
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
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Alamat
                    </label>
                    <textarea
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      rows={3}
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                    ></textarea>
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
                        I agree with the{' '}
                        <a
                          href="#sk"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Create Account
                    </button>
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
