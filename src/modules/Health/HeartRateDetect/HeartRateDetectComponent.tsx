import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Container, Paper, Typography} from "@material-ui/core";
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import './styles.css';
import {PresetForeheadPosition, processImage, buffer, times} from "./process";
import {ArgumentAxis, Chart, LineSeries, ValueAxis} from "@devexpress/dx-react-chart-material-ui";
import moment from "moment";
import {Animation} from "@devexpress/dx-react-chart";


interface WebCamProps {
    setBufferMap: (a: any) => void,
    setFFTMap: any
}


const WebCamComponent = (props: WebCamProps) => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null as null | HTMLCanvasElement);

    // console.log(faceapi.nets);
    // console.log(webcamRef.current);

    const videoConstraints = {
        // facingMode: "user"
    };

    useEffect(() => {
        faceapi.loadTinyFaceDetectorModel('/faceapi-models').then();
        faceapi.loadFaceLandmarkTinyModel('/faceapi-models').then();
        if (!webcamRef.current) return;
        // console.log(webcamRef.current);
    }, []);


    // const processFace = async () => {
    //     const options = new faceapi.TinyFaceDetectorOptions();
    //     await new Promise(r => setTimeout(r, 5000));
    //     while (true) {
    //         console.log("start detection");
    //         const input = document.getElementById('streamVideo') as HTMLVideoElement;
    //         const detection = await faceapi.detectSingleFace(input, options);
    //         console.log(detection);
    //         if (!canvasRef.current) continue;
    //         if (!detection) continue;
    //         const ctx = canvasRef.current.getContext('2d')!;
    //         ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    //         const resizedDetections = faceapi.resizeResults(detection, {
    //             width: 1280,
    //             height: 800,
    //         })
    //         faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
    //
    //     }
    // }

    const process =
        async () => {
            const options = new faceapi.TinyFaceDetectorOptions();
            await new Promise(r => setTimeout(r, 5000));
            const faceCanvas = document.createElement('canvas');
            faceCanvas.width = 1280;
            faceCanvas.height = 800;
            const imageElement = document.createElement('img');
            let presetForeheadPosition = null as null | PresetForeheadPosition;
            let lockedPresetForeheadPosition = null as null | PresetForeheadPosition;

            window.addEventListener('keypress', e => {
                if (e.key === 'l') {
                    if (lockedPresetForeheadPosition === null) {
                        console.log('lock');
                        lockedPresetForeheadPosition = presetForeheadPosition;
                    } else {
                        console.log('unlock');
                        lockedPresetForeheadPosition = null;
                    }
                }
            })
            const video = document.getElementById('streamVideo')!;
            while (true) {
                if (!webcamRef.current) continue;
                if (!canvasRef.current) return;
                //@ts-ignore
                // const image = webcamRef.current.getScreenshot();
                // console.log(image);
                // if (!image) continue;
                // if (image === 'data:,') return;
                // console.log(image);
                // imageElement.src = image;
                presetForeheadPosition = await processImage(video, options, canvasRef.current, faceCanvas, lockedPresetForeheadPosition, props.setBufferMap, props.setFFTMap);
                if (lockedPresetForeheadPosition)  await new Promise(r => setTimeout(r, 10));
            }
        }


    const onUserMedia = () => {
        if (!webcamRef.current) return;
        if (!canvasRef.current) return;
        console.log("media");
        //@ts-ignore
        console.log(webcamRef.current!.stream);
        // processFace().then();
        process().then();
    }


    return (
        <div className="WebcamComponent">
            <Webcam
                audio={false}
                height={800}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                id="streamVideo"
                onUserMedia={onUserMedia}
                imageSmoothing={false}
                // videoConstraints={videoConstraints}
            />
            <canvas ref={canvasRef} width={1280} height={800} className="boxOverlayCanvas"></canvas>
        </div>
    )
}


export default () => {

    const [bufferMap, setBufferMap] = useState([]);
    const [fftMap, setFftMap] = useState([]);

    // useEffect(() => {
    //     console.log(fftMap);
    // }, [fftMap]);

    return (
        <div className="HeartRateDetectComponent">
            <Container maxWidth="md">
                <Typography variant="h4">Heart Rate Detect</Typography>
                <WebCamComponent setBufferMap={setBufferMap} setFFTMap={setFftMap}/>
                <br />
                <br />
                <Paper>
                    <Chart data={bufferMap}>
                        <ArgumentAxis/>
                        <ValueAxis />
                        <LineSeries
                            valueField="buffer"
                            argumentField="times"
                        />
                        {/*<Animation />*/}
                    </Chart>
                </Paper>
                <Paper>
                    <Chart data={fftMap}>
                        <ArgumentAxis/>
                        <ValueAxis />
                        <LineSeries
                            valueField="value"
                            argumentField="frequency"
                        />
                        {/*<Animation />*/}
                    </Chart>
                </Paper>
            </Container>

        </div>
    )
}

