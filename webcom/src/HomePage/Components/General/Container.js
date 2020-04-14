import React from "react";
import Chat from './Chat';
import { ConnectionConsumer, ChannelConsumer} from "./Principal";


const Container = ({ user, users }) => {
  return (
    <ConnectionConsumer>
      {({ connection, updateConnection }) => (
        <ChannelConsumer>
          {({ channel, updateChannel }) => (
            <Chat
               usuario={user}
               users={users}
               connection={connection}
                updateConnection={updateConnection}
                channel={channel}
                updateChannel={updateChannel}
            />
          )}
        </ChannelConsumer>
      )}
    </ConnectionConsumer>
  );
};

export default Container;