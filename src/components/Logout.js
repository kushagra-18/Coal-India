import {API_URL} from '../const';

function LogoutUser() {

    const token = localStorage.getItem("token");
    
    const url = API_URL+"/user/logout";

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        }
    })
        .then((result) => {
            
            if(result.status === 200){
                localStorage.removeItem('token');
                // window.location.href = "/";
            }else{
                alert("Error");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

export default LogoutUser;