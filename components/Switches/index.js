import axios from "axios";
import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

const PASSWORD = "bms2022";

// const SERVER = "http://192.168.0.108:8000";
const SERVER = "https://esp8266-bms.herokuapp.com";

const Switches = () => {
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(false);
  // authorization
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem(authorize))) {
      setIsAuthorized(true);
    }
  }, []);

  useEffect(async () => {
    await axios.post(`${SERVER}/webhooks/update-switches`, {
      switch1,
      switch2,
    });
  }, [switch1, switch2]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }, [error]);

  // authorization logic
  const authorize = (e) => {
    e.preventDefault();
    if (!password) {
      setError("Enter the password");
      return;
    }
    if (password === PASSWORD) {
      setIsAuthorized(true);
      localStorage.setItem(authorize, true);
    } else {
      setError("Incorrect Password");
    }
  };

  return (
    <>
      <div className="flex flex-col h-full items-center w-full justify-around">
        <div className="item-center justify-center bg-gray-200 py-4 px-4 mb-8 rounded">
          <p className="flex item-center justify-center text-gray-900 text-2xl font-bold">
            Smart Energy Supply System <LightbulbIcon color="secondary" />
          </p>
        </div>
        <div
          className={`bg-gray-200 flex items-center h-${
            isAuthorized ? "50" : "72"
          }  text-xl justify-center rounded-md px-5 w-80 py-6 flex-col shadow-xl`}
        >
          {isAuthorized ? (
            <>
              <button
                className="bg-purple-600 flex justify-between items-center text-gray-50 text-xl font-medium  rounded-lg p-2 px-6 py-2 w-full  border-2 border-purple-600"
                onClick={() => setSwitch1(!switch1)}
              >
                Circut 01
                <Switch checked={switch1} color="secondary" />
              </button>
              <button
                className=" bg-purple-600 flex justify-between mt-4 items-center text-gray-50 text-xl font-medium  rounded-lg p-2 px-6 py-2 w-full  border-2 border-purple-600"
                onClick={() => setSwitch2(!switch2)}
              >
                Circut 02
                <Switch checked={switch2} color="secondary" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <LockIcon
                color="secondary"
                className="mb-7"
                style={{ fontSize: "40" }}
              />
              <form onSubmit={authorize}>
                <FormControl
                  sx={{ m: 1, width: "25ch" }}
                  variant="outlined"
                  color="secondary"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <button
                  className="mt-5 mb-2 flex justify-center items-center text-gray-50 tracking-wide	 text-xl font-normal  rounded-lg p-2 px-6 py-2 w-full bg-purple-600 border-2 border-purple-600"
                  type="submit"
                >
                  Go
                </button>
              </form>
              {error ? (
                <p className="text-red-600 text-sm font-medium">{error}</p>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Switches;
