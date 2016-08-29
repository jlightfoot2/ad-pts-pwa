import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import DeviceSignalCellular0Bar from 'material-ui/svg-icons/device/signal-cellular-0-bar';
import DeviceSignalCellular2Bar from 'material-ui/svg-icons/device/signal-cellular-2-bar';
import DeviceSignalCellular4Bar from 'material-ui/svg-icons/device/signal-cellular-4-bar';
const StatusIcon = ({onlineStatus,checkOnlineStatus}) => {

  var onClick = () => {
  	checkOnlineStatus();
  }
  var cellIcon = <DeviceSignalCellular2Bar onClick={onClick} />;
  var message = "unknown"
  switch(onlineStatus){
  	case 1:
  	  cellIcon = <DeviceSignalCellular4Bar onClick={onClick} />;
  	  message = 'online';
  	  break;
  	default:
  	  cellIcon = <DeviceSignalCellular0Bar onClick={onClick}/>;
  	  message = 'offline';
  }

  return (
  		<div style={{marginTop: '12px'}}>
  			{cellIcon} <span onClick={onClick}>{message}</span>
  		</div>
  );
}


export default StatusIcon;
