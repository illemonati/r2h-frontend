import * as faceapi from 'face-api.js';
// const ft = require('fourier-transform');
const dsp = require('dsp.js');
// const lerp = require('lerp');
const everpolate = require('everpolate');
export interface PresetForeheadPosition {
    foreheadX: number;
    foreheadY: number;
    foreheadBoxWidth: number;
    foreheadBoxHeight: number;
}

const linSpace = (start: number, end: number, length: number): number[] => {
    const step = (end - start) / length;
    const res: number[] = [];
    for (let i = 0; i < length; i ++) {
        const lastVal = res[i-1] || start;
        res.push(lastVal + step);
    }
    return res;
}

const hamming = (in_arr: number[]) => {
    const out_arr = [];
    const M = in_arr.length;
    for (var i = 0; i < M; i++) {
        var ham = (0.54 - (0.46 * Math.cos((2.0*Math.PI*i)/(M - 1))))
        out_arr.push(ham * in_arr[i]);
    }
    return out_arr;
}

const calcDeviationFromMean = (in_arr: number[]) => {
    var sum = 0;
    for (var term of in_arr) {
        sum += term;
    }
    const mean = sum / in_arr.length;
    const out_arr = [];
    for (var term of in_arr) {
        out_arr.push(term - mean);
    }
    return out_arr;
}

const getRangeIndexes = (freqs: number[], lowerBound: number, upperBound: number) => {
    const out_arr = [];
    for (var i = 0; i < freqs.length; i++) {
        if ((i > lowerBound) && (i < upperBound)) {
            out_arr.push(i)
        }
    }
    return out_arr;
}

const argmax = (arr: number[]) => {
    return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

const dsu = (arr1: number[], arr2: number[]) => arr1
    .map((item, index) => [arr2[index], item]) // add the args to sort by
    .sort(([arg1], [arg2]) => arg2 - arg1) // sort by the args
    .map(([, item]) => item);


const argsort = (arr: number[]) => {
    return dsu(Array.from(arr.keys()), arr);
}


const calcFreqs = (fps: number, length: number) => {
    const a = fps / length;
    const out_arr = [];
    for (var i = 0; i < length; i++) {
        out_arr.push(a * (i / 2 + 1) * 60)
    }
    return out_arr;
}

const getIndexes = (arr: any[], indexes: number[]) => {
    const out_arr = [];
    for (const index of indexes) {
        out_arr.push(arr[index]);
    }
    return out_arr;
}

export const buffer = [] as number[];
export const times = [] as number[];
const bufferSize = 512;

export const processHeartRate = (foreheadImageData: Uint8ClampedArray, setBufferMap: any, setFFTMap: any) => {
    // console.log(foreheadImageData);
    let redSum = 0;
    let greenSum = 0;
    // let blueSum = 0;
    const dataPoints = foreheadImageData.length / 4;
    for (let i = 0; i < foreheadImageData.length; i+=4) {
        redSum += foreheadImageData[i];
        greenSum += foreheadImageData[i+1];
        // blueSum += foreheadImageData[i+2];
    }
    const redMean = redSum / dataPoints;
    const greenMean = greenSum / dataPoints;
    // const blueMean = blueSum / dataPoints;
    const foreHeadMean = (redMean + greenMean) / 2;
    buffer.push(foreHeadMean)
    times.push(performance.now() / 1000);
    if (buffer.length > bufferSize) {
        buffer.shift();
        times.shift();
    }
    // console.log(lerp([1, 2, 3], [3, 2, 0], 2.5))

    if (buffer.length > 10) {
        const bufferCloned = buffer.slice();
        const timesCloned = times.slice();
        const timeUsed = (timesCloned[timesCloned.length - 1] - timesCloned[0]);
        const fps = bufferCloned.length / timeUsed;
        const eventimesCloned = linSpace(timesCloned[0], timesCloned[timesCloned.length - 1], timesCloned.length);
        // console.log(timesCloned);
        // console.log(eventimesCloned);
        const interpolated = everpolate.linear(eventimesCloned, timesCloned, bufferCloned);
        // console.log(interpolated);
        const hammed = hamming(interpolated);
        // console.log(hammed);
        const deviationFromMean = calcDeviationFromMean(hammed);
        // console.log(deviationFromMean);
        // console.log(bufferCloned.length);
        if (bufferCloned.length === bufferSize) {
            // const spectrum = ft(deviationFromMean);
            const fft = new dsp.FFT(bufferCloned.length, 44100);
            fft.forward(deviationFromMean);
            // console.log(fft.spectrum);
            const freqs = calcFreqs(fps, bufferCloned.length);
            // console.log(freqs);
            const rangeIndexes = getRangeIndexes(freqs, 50, 120);
            // console.log(rangeIndexes)
            const purned = getIndexes(fft.spectrum, rangeIndexes);
            // const purned = getIndexes(hammed, rangeIndexes)
            const spectrum: number[] = Array.from(fft.spectrum);
            console.log(spectrum.length);
            console.log(freqs.length);
            // const mostLikelyIndex = argmax(purned);
            const mostLikelyIndexs = argsort(purned);
            const bpms = [];
            for (const mostLikelyIndex of mostLikelyIndexs) {
                const mostLikelyVal = purned[mostLikelyIndex];
                const mostLikelyIndexInSpectrum = spectrum.indexOf(mostLikelyVal);
                // const mostLikelyIndexInSpectrum = hammed.indexOf(mostLikelyVal);
                // const freqsPurned = getIndexes(freqs, rangeIndexes);
                // console.log(mostLikelyIndex);
                // const bpm = freqsPurned[mostLikelyIndex];
                const bpm = freqs[mostLikelyIndexInSpectrum];
                if (bpm < 60 && bpm > 120) continue;
                // console.log(bpm)
                bpms.push(bpm);
            }

            console.log(bpms);

            // console.log(purned);
            const fftMap = [] as any[];
            freqs.forEach((v: number, i: number) => {
                if (v < 60 || v > 120) {
                    return;
                }
                fftMap.push( {
                    value: spectrum[i],
                    // frequency: freqsPurned[i],
                    frequency: v,
                })
            })
            setFFTMap(fftMap);
        }

        // console.log(buffer);
        // console.log(hammed);
        // console.log(fps);
        // const linSpacedNumbers = linSpace(times[0], times[times.length - 1], buffer.length);


        // console.log(linSpacedNumbers);
        // const evenTimes = linspace(times[0], times[times.length], buffer.length);
        // console.log(evenTimes);
        // console.log(JSON.stringify(buffer));;
        const bufferMap = buffer.map((v, i) => {
            return {
                buffer: v,
                times: times[i]
            }
        })
        setBufferMap(bufferMap);
    }
    // console.log(buffer);
}

const screenImageCanvas = document.createElement("canvas");
screenImageCanvas.width = 1200;
screenImageCanvas.height = 800;
const screenImageCanvasCtx = screenImageCanvas.getContext('2d')!;

export const processImage = async (videoElement: HTMLVideoElement, options: faceapi.TinyFaceDetectorOptions, canvas: HTMLCanvasElement, faceCanvas: HTMLCanvasElement, presetForeheadPosition: PresetForeheadPosition | null, setBufferMap: any, setFFTMap: any) : Promise<PresetForeheadPosition | null> => {
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;
    // ctx.drawImage(imageElement, 0, 0);

    let foreheadX = 0;
    let foreheadY = 0
    let foreheadBoxWidth = 0;
    let foreheadBoxHeight = 0;

    if (!presetForeheadPosition) {
        const detection = await faceapi.detectSingleFace(videoElement, options);
        if (!detection) return null;
        const resizedDetection = faceapi.resizeResults(detection, {
            width: 1280,
            height: 800,
        })!;
        const faceX = resizedDetection.box["_x"];
        const faceY = resizedDetection.box["_y"];
        const faceWidth = resizedDetection.box["_width"];
        const faceHeight = resizedDetection.box["_height"];
        foreheadBoxWidth = 90;
        foreheadBoxHeight = 60;
        foreheadX = faceX + (faceWidth / 2) - (foreheadBoxWidth/2);
        foreheadY = faceY + (faceHeight / 16) - (foreheadBoxHeight/2);
        // console.log(resizedDetection);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetection);
    } else {
        foreheadBoxWidth = presetForeheadPosition.foreheadBoxWidth;
        foreheadBoxHeight = presetForeheadPosition.foreheadBoxHeight;
        foreheadY = presetForeheadPosition.foreheadY;
        foreheadX = presetForeheadPosition.foreheadX;

        // console.log(imageElement.src);
        const foreheadImageData = screenImageCanvasCtx.getImageData(foreheadX, foreheadY, foreheadBoxWidth, foreheadBoxHeight);
        // console.log(foreheadImageData);
        // console.log(screenImageCanvas.toDataURL());
        // const a = document.createElement('canvas');
        // a.width = foreheadBoxWidth;
        // a.height = foreheadBoxHeight;
        // const actx = a.getContext('2d')!;
        // actx.putImageData(foreheadImageData, 0, 0);
        // console.log(a.toDataURL());

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        processHeartRate(foreheadImageData.data, setBufferMap, setFFTMap);
    }
    screenImageCanvasCtx.drawImage(videoElement, 0, 0);


    // const faceCanvasCtx = faceCanvas.getContext('2d')!;
    // faceCanvasCtx.drawImage(imageElement, 0, 0);

    // const faceData = faceCanvasCtx.getImageData(faceX, faceY, faceWidth, faceHeight);;

    // console.log(foreheadX);



    const foreHeadBox = { x: foreheadX, y: foreheadY, width: foreheadBoxWidth, height: foreheadBoxHeight }
    const drawOptions = {
        label: 'Forehead Section',
        lineWidth: 2
    }
    const drawBox = new faceapi.draw.DrawBox(foreHeadBox, drawOptions)
    drawBox.draw(canvas);

    return {
        foreheadX,
        foreheadY,
        foreheadBoxWidth,
        foreheadBoxHeight
    }
}
