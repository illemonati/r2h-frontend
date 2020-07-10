import React, {ChangeEvent, useState} from "react";
import {Button, Container, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import {RiskCalculatorFieldResult, RiskCalculatorFieldResults, RiskCalculatorFields} from "./RiskCalculatorFormat";
import RiskCalculatorConfigComponent from "./Configuration/RiskCalculatorConfigComponent";
import './styles.css';
import RiskCalculatorResultsComponent from "./Results/RiskCalculatorResultsComponent";
import {updateRiskCalculatorComparisonInputs, updateRiskCalculatorInputs} from "../../actions/riskCalculatorInputs";
import {useDispatch, useSelector} from "react-redux";
import SwipeableViews from "react-swipeable-views";
import {Element, scroller} from "react-scroll/modules";
import RiskCalculatorIntroComponent from "./Intro/RiskCalculatorIntroComponent";


interface RiskCalculatorComponentProps {
    configs: RiskCalculatorFields
}

export default function RiskCalculatorComponent(props: RiskCalculatorComponentProps) {

    const [inputs, setInputs] = useState([] as RiskCalculatorFieldResults);
    const [comparisonInputs, setComparisonInputs] = useState([] as RiskCalculatorFieldResults);
    const [tabVal, setTabVal] = useState(0);
    const [introOpen, setIntroOpen] = useState(true);
    const [comparisonModeState, setComparisonModeState] = useState(false);
    const dispatch = useDispatch();
    const savedInputs = useSelector<any, RiskCalculatorFieldResults>(state => state.riskCalculatorInputs.slice());
    const savedComparisonModeInputs = useSelector<any, RiskCalculatorFieldResults>(state => state.riskCalculatorComparisonInputs.slice());

    let configs = props.configs.slice();
    let comparisonConfigs = props.configs.slice();

    if (savedInputs && savedInputs.length > 0) {
        configs = configs.map((config, i) => {
            if (savedInputs.length > i) {
                config.fieldConfig.default = savedInputs[i].result;
            }
            return config;
        })
    }

    if (savedComparisonModeInputs && savedComparisonModeInputs.length > 0) {
        comparisonConfigs = comparisonConfigs.map((compConfig, i) => {
            if (savedComparisonModeInputs.length > i) {
                compConfig.fieldConfig.default = savedComparisonModeInputs[i].result;
            }
            return compConfig;
        })
    }

    const handleConfigCallback = (result: RiskCalculatorFieldResult) => {
        setInputs(prevState => {
            prevState[result.field.fieldNumber] = result;
            return prevState.slice();
        });
        if (inputs.length === props.configs.length) {
            dispatch(updateRiskCalculatorInputs(inputs.slice()));
        }
    };

    const handleComparisonConfigCallback = (result: RiskCalculatorFieldResult) => {
        setComparisonInputs(prevState => {
            prevState[result.field.fieldNumber] = result;
            return prevState.slice();
        });
        if (comparisonInputs.length === props.configs.length) {
            dispatch(updateRiskCalculatorComparisonInputs(comparisonInputs.slice()));
        }
    };


    const handleTabValChange = (e: ChangeEvent<{}>, newVal: number) => {
        setTabVal(newVal);
        scrollToTop();
    };

    const handleButtonClick = () => {
        setTabVal(1 - tabVal);
        scrollToTop();
    };

    const handleSwipe = (index: number) => {
        setTabVal(index);
        scrollToTop();
    };

    const scrollToTop = () => {
        scroller.scrollTo('topOfPage', {
            duration: 500,
            delay: 100,
            smooth: true,
            offset: -200
        });
    };


    return (
        <div className="RiskCalculatorComponent">
            <RiskCalculatorIntroComponent open={introOpen} setOpen={setIntroOpen}/>
            <Element name="topOfPage"/>
            <Typography variant='h5'>
                Risk Calculator for Total Knee or Hip Arthoplasty Based on VA VASQIP Data
            </Typography>
            <br/>
            <br/>
            <Container className="containerBox">
                <Paper square>
                    <Tabs value={tabVal}
                          onChange={handleTabValChange}
                          className="toggleTabs"
                          centered={true}
                          textColor={"primary"}
                    >
                        <Tab label="Inputs"/>
                        <Tab label="results"/>
                    </Tabs>
                </Paper>
                <br/>
                {/*<Button variant="outlined" onClick={() => setComparisonModeState(!comparisonModeState)}>*/}
                {/*    {(comparisonModeState) ? "Disable" : "Enable"} Comparison Mode*/}
                {/*</Button>*/}
                <br/>
                <SwipeableViews index={tabVal} onChangeIndex={handleSwipe}>
                    <RiskCalculatorConfigComponent fields={configs}
                                                   callBack={handleConfigCallback}
                                                   comparisonFields={comparisonConfigs}
                                                   comparisonCallBack={handleComparisonConfigCallback}
                                                   comparisonModeState={comparisonModeState}
                                                   setComparisonModeState={setComparisonModeState}
                    />
                    <RiskCalculatorResultsComponent inputs={inputs} comparisonInputs={comparisonInputs}
                                                    comparisonModeState={comparisonModeState}/>
                </SwipeableViews>
            </Container>
            <br/>
            <Button onClick={handleButtonClick}>
                {(tabVal === 0) ? 'Results' : 'Inputs'}
            </Button>
            <br/>
            <br/>
        </div>
    )
}



