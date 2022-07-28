import React, { useEffect, useState } from 'react';
import { ErrorResponseAction } from '../../common/actions/response/error.response.action';
import { LoadingResponseAction } from '../../common/actions/response/loading.response.action';
import { VideoResponseAction } from '../../common/actions/response/video.response.action';
import { MAIN_CHANNEL } from '../../common/constants';
import { Actions } from '../../common/enums/actions.enum';
import { Action } from '../../common/interfaces/action.interface';
import StoreContext from '../contexts/store.context';

const StoreProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [video, setVideo] = useState<string>();

  useEffect(() => {
    window.electron.ipcRenderer.on<[Action]>(MAIN_CHANNEL, ([action]) => {
      switch (action.type) {
        case Actions.loadingResponse:
          setLoading((action as LoadingResponseAction).payload.loading);
          break;
        case Actions.errorResponse:
          setError((action as ErrorResponseAction<Error>).payload.err);
          break;
        case Actions.videoResponse:
          setVideo((action as VideoResponseAction).payload.filePath);
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <StoreContext.Provider
      value={{
        loading,
        error,
        video,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
