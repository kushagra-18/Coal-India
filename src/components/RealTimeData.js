import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import io from "socket.io-client";
import RTCard from "./RTCard";
import { useState ,useEffect} from "react";
import {API_URL} from '../const';

const RealTimeData = () => {

  const temp = {
    tv: '...',
    ti: '...',
    to: '...',
  }
  const [data, setData] = useState(temp);


  const socket = io.connect(API_URL, {
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
            2500,

          );
      }else{
        NotificationManager.error(
          data.msg,
          '',
          2500,

        );
      }
    });
  
    return () => socket.disconnect();
  }, [socket]);



  return (
  <div className='socket-data'>
    <RTCard data={data}/>
    <NotificationContainer/>
  </div>

  );

};

export default RealTimeData;
