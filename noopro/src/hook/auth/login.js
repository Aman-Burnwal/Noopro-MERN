
import toast from "react-hot-toast";
import { removeToken } from "../../../store/slice/authSlice";
import { removeUser } from "../../../store/slice/profileSlice";
import { ChangePasswordAPI } from "../../services/apis"


export const passwodChanger =  async (e, password, confirmPassword, setError ,
        dispatch , token, error,  setPassword, setConfirmPassword) => {
        e.preventDefault();
        console.log("In passwordChanger")
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!passwordRegex.test(password) || !passwordRegex.test(confirmPassword)) {
                setError({  error: true, message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character" })
                return
        }

        setError({error: false, message: null})

        fetch(ChangePasswordAPI, {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                        Authorization : token,
                },
                body: JSON.stringify({ oldPassword: password, newPassword:confirmPassword}),
        })
                .then(res => {

                        console.log(res)
                        if(res.status == 401) {
                                dispatch( removeToken());
                                dispatch( removeUser());

                                // navigate("/")
                                console.log("")
                                setError( {...error , message: error.message})
                                console.log("Heye it's error time")
                                return;
                        }
                        console.log("In Res 1 ", res)

                        if (res.status == 200) {
                                setPassword("");
                                setConfirmPassword("");
                                toast("success");
                        }
                        
                        return res.json()
                })
           
                .catch(error => console.warn("The error is here ", error));


}