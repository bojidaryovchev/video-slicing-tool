// import ffmpeg from 'ffmpeg';
import React, { useContext, useEffect, useRef } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { OpenFileDialogAction } from '../common/actions/request/open-file-dialog.request.action';
import { VideoRequestAction } from '../common/actions/request/video.request.action';
import { IpcRendererAdapter } from '../common/adapters/ipc-renderer.adapter';
import { createDispatcher } from '../common/dispatcher';
import './App.css';
import Providers from './components/templates/Providers/Providers';
import StoreContext from './contexts/store.context';

const { dispatch } = createDispatcher(
  new IpcRendererAdapter(window.electron.ipcRenderer)
);

const Root: React.FC<React.PropsWithChildren<unknown>> = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // useEffect(() => {
  //   if (fileUri) {
  //     // videoRef.current?.load();
  //     // window.electron.ipcRenderer.sendMessage('ipc-example', [fileUri]);
  //   }
  // }, [fileUri, videoRef]);

  const openFileDialogHandler = () => {
    dispatch(new OpenFileDialogAction());
  };

  const getVideoHandler = () => {
    dispatch(new VideoRequestAction());
  };

  const { loading, error, video } = useContext(StoreContext);

  useEffect(() => {
    if (video) {
      videoRef.current?.load();
    }
  }, [video]);

  return (
    <Providers>
      {!video && (
        <button
          className="open-video-btn"
          type="button"
          onClick={openFileDialogHandler}
        >
          Open video
        </button>
      )}

      {loading && <p>Loading...</p>}

      {video && (
        <video ref={videoRef} controls>
          <source src={video} type="video/mp4" />
        </video>
      )}
    </Providers>
  );
};

export default function App() {
  return (
    <Providers>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
        </Routes>
      </Router>
    </Providers>
  );
}
