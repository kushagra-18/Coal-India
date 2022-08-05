import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import io from "socket.io-client";
import RTCard from "./RTCard";
import { useState ,useEffect} from "react";

const RealTimeData = () => {

  const temp = {
    tv: '...',
    ti: '...',
    to: '...',
  }
  const [data, setData] = useState(temp);

  // const URL = 'https://coal-india.herokuapp.com/';

  const URL = 'http://localhost:5000/';


  const socket = io.connect(URL, {
    secure: true,
    reconnection: true,
    rejectUnauthorized: false,
    transports: ["websocket"],
  });


  // emit msg to server
  
  useEffect(() => {
    socket.emit('getVehicleCount');
  }, []);
   


  useEffect(() => {
    socket.on('count', (count) => {
        setData(count);
    });
  
    return () => socket.disconnect();
  }, [socket]);


  
  useEffect(() => {
    socket.on('vehicleData', (data) => {


      if(data.path === 'entry'){
          NotificationManager.success(
            data.msg,
            '',
            2200,

          );
      }else{
        NotificationManager.error(
          data.msg,
          '',
          2200,

        );
      }
    });
  
    return () => socket.disconnect();
  }, [socket]);



  return (
  <div>
    <RTCard data={data}/>
    <NotificationContainer/>
  </div>

  );

};

export default RealTimeData;
