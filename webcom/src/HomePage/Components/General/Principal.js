import React, { useState, createContext } from "react";
import Container from './Container';

const ConnectionContext = createContext({
  connection: null,
  updateConnection: () => {}
});

const ChannelContext = createContext({
  channel: null,
  updateChannel: () => {}
});

const Principal = ({user, users}) => {
  const [connection, setconnection] = useState(null);
  const [channel, setChannel] = useState(null);
  
  const updateConnection = conn => {
    setconnection(conn);
  };

  const updateChannel = chn => {
    setChannel(chn);
  };

  return (
    <ConnectionContext.Provider value={{ connection, updateConnection }}>
      <ChannelContext.Provider value={{ channel, updateChannel }}>
          <Container user={user} users={users} />
      </ChannelContext.Provider>
    </ConnectionContext.Provider>
  );
};

export const ConnectionConsumer = ConnectionContext.Consumer
export const ChannelConsumer = ChannelContext.Consumer
export default Principal;