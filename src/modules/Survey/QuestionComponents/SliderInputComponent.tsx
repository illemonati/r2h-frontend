import {SliderConfig, SliderMark, SliderQuestion} from "../QuestionsFormat";
import React, {useEffect, useState} from "react";
import {Box, Slider, Typography} from "@material-ui/core";
import {OptionProps} from "./OptionProps";


interface SliderInputComponent extends OptionProps {
    question: SliderQuestion
}

export default function SliderInputComponent(props: SliderInputComponent) {

    const config = props.question.sliderConfig as SliderConfig;


    const [sliderVal, setSliderVal] = useState(config.default ? config.default : config.start);
    function valuetext(value: number) {
        return config.textOptions ? config.textOptions[((value/config.step)-config.start)] : `${value}`
    }

    function handleChange(e: any, newValue: number | number[]) {
        setSliderVal(newValue as number);
    }

    let marks = new Array<SliderMark>();
    for (let i = config.start; i < config.end+1; ++i) {
        marks.push({
            value: i,
            label: valuetext(i)
        });
    }

    const makeCallback = () => {
        props.setResultCallback({
            questionNumber: props.number,
            choiceType: props.question.choiceType,
            sliderValue: sliderVal
        })
    };

    useEffect(() => {
        makeCallback()
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        makeCallback()
        //eslint-disable-next-line
    }, [sliderVal]);


    return (
        <Box>
            <Typography gutterBottom>
                {config.noRange ? `${valuetext(sliderVal)}` : `${config.start} - ${config.end}`}
            </Typography>
                <br />
                <br />
                <br />
                <Slider
                    defaultValue={0}
                    step={config.step}
                    min={config.start}
                    max={config.end}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    aria-labelledby="discrete-slider-always"
                    value={sliderVal}
                    onChange={handleChange}
                    marks={config.marks ? marks : true}

                />
        </Box>
    )
}
