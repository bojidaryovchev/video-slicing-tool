// import ffmpeg from 'ffmpeg';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { Actions } from 'shared/actions';
import './App.css';

const Root: React.FC = () => {
  const [fileUri, setFileUri] = useState<string | null>(null);

  const onChangeHandler = ({ nativeEvent }: ChangeEvent<HTMLInputElement>) => {
    const input = nativeEvent.target as HTMLInputElement;

    setFileUri(input.value);

    // const reader = new FileReader();

    // reader.onload = function (e: any) {
    //   setFileUri(e.target.result);

    //   // videoSrc.src = e.target.result
    //   // videoTag.load()
    // }.bind(this);

    // reader.readAsDataURL(input.files![0]);
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (fileUri) {
      // videoRef.current?.load();
      // window.electron.ipcRenderer.sendMessage('ipc-example', [fileUri]);
    }
  }, [fileUri, videoRef]);

  const pingPongHandler = () => {
    window.electron.ipcRenderer.sendMessage(Actions.OPEN_FILE_DIALOG_ACTION, [
      'ping',
    ]);
  };

  const getVideoHandler = () => {
    window.electron.ipcRenderer.sendMessage(Actions.GET_STORED_VIDEO, []);
  };

  return (
    <>
      <button type={'button'} onClick={pingPongHandler}>
        click me
      </button>

      <button type={'button'} onClick={getVideoHandler}>
        get video
      </button>

      {fileUri && (
        <video ref={videoRef} width="400" controls>
          <source src={fileUri} type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      )}
    </>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
      </Routes>
    </Router>
  );
}
