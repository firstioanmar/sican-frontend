import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Settings() {
  const history = useHistory();
  const uuid = localStorage.getItem('uuid');
  const [nama, setNama] = useState(localStorage.getItem('username'));
  const role = localStorage.getItem('role_id');
  const [password, setPassword] = useState(localStorage.getItem('password'));
  const [alamat, setAlamat] = useState(localStorage.getItem('alamat'));
  const [showPassword, setShowPassword] = useState(false);
  // get data
  const [informasi, setInformasi] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const formData = new FormData();
      formData.append('id_penulis', uuid);

      await axios
        .post('http://localhost:1500/jumlahceritabypenulis', formData)
        .then(({ data }) => {
          if (isMounted) {
            setInformasi(data.response);
          }
        })
        .catch((error) => console.log(error));
    };

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogout = (e) => {
    localStorage.removeItem('uuid');
    localStorage.removeItem('username');
    localStorage.removeItem('role_id');
    localStorage.removeItem('password');
    localStorage.removeItem('alamat');

    Swal.fire({
      title: 'Logout successful!',
      icon: 'success',
      timer: 2500,
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.hideLoading();
      },
    }).then(history.push('/login'));
  };

  const UpdateHandler = async (e) => {
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

    formData.append('nama', nama);
    formData.append('password', password);
    formData.append('alamat', alamat);
    formData.append('role', role);
    formData.append('uuid', uuid);

    await axios
      .post('http://localhost:1500/updateusers', formData, { timeout: 5000 })
      .then((response) => {
        localStorage.setItem('uuid', uuid);
        localStorage.setItem('username', nama);
        localStorage.setItem('alamat', alamat);
        localStorage.setItem('password', password);
        localStorage.setItem('role_id', role);
        Swal.fire({
          title: 'Edit successful!',
          icon: 'success',
          timer: 2500,
          showConfirmButton: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.hideLoading();
          },
        }).then(setOpen(false));
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
      <Box
        sx={{
          width: '100%',
          position: 'relative',
        }}
      >
        <Card
          orientation="horizontal"
          sx={{
            width: '100%',
            flexWrap: 'wrap',
            [`& > *`]: {
              '--stack-point': '500px',
              minWidth:
                'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
            },
          }}
        >
          <AspectRatio ratio="1" maxHeight={182} sx={{ minWidth: 182, flex: 1 }}>
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
              srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <CardContent>
            <Typography fontSize="xl" fontWeight="lg">
              {nama ? nama : 'Guest'}
            </Typography>
            <Typography level="body2" fontWeight="lg" textColor="text.tertiary">
              {role === '1' ? 'penulis' : 'User'}
            </Typography>
            {informasi.map((info) => (
              <Sheet
                sx={{
                  bgcolor: 'background.level1',
                  borderRadius: 'sm',
                  p: 1.5,
                  my: 1.5,
                  display: 'flex',
                  gap: 2,
                  '& > div': { flex: 1 },
                }}
                key={info.fkg_penulis}
              >
                <>
                  <div>
                    <Typography level="body3" fontWeight="lg">
                      Cerita
                    </Typography>
                    <Typography fontWeight="lg">{info.jumlah_cerita}</Typography>
                  </div>
                  <div>
                    <Typography level="body3" fontWeight="lg">
                      Likes
                    </Typography>
                    <Typography fontWeight="lg">{info.jumlah_likes}</Typography>
                  </div>
                </>
              </Sheet>
            ))}
            <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
              <Button variant="solid" color="primary" onClick={handleClickOpen}>
                Edit Account
              </Button>
              <Button variant="solid" color="danger" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Dialog open={open} fullWidth={'xl'} maxWidth={'xl'} onClose={handleClose}>
        <DialogTitle>Edit Account</DialogTitle>
        <form onSubmit={UpdateHandler}>
          <DialogContent>
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
                value={nama}
                onChange={(e) => setNama(e.target.value)}
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
                  {showPassword ? <i className="fa fa-eye-slash" /> : <i className="fa fa-eye" />}
                </label>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Password"
                name="password"
                value={password}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="solid" color="danger">
              Cancel
            </Button>
            <Button type="submit" variant="solid" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
