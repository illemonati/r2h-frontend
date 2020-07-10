import React, {ChangeEvent, useState} from "react";

import {
    Container,
    Paper, Tab,
    Tabs
} from "@material-ui/core";
import {RiskCalculatorResultsComponentProps} from "./shared";
import SwipeableViews from "react-swipeable-views";
import RiskCalculatorResultsTableDisplayComponent from "./displays/RiskCalculatorResultsTableDisplayComponent";
import RiskCalculatorResultsGaugesDisplayComponent from "./displays/RiskCalculatorResultsGaugesDisplayComponent";


export default function RiskCalculatorResultsComponent(props: RiskCalculatorResultsComponentProps) {

    const [tabVal, setTabVal] = useState(0);
    const handleTabValChange = (e: ChangeEvent<{}>, newVal: number) => {
        setTabVal(newVal);
    };
    const handleSwipe = (index: number) => {
        setTabVal(index);
    };

    return (
        <div className="RiskCalculatorResultsComponent">
            <br/>
            <br/>
            <Container className="container">
                <Paper square>
                    <Tabs value={tabVal}
                          onChange={handleTabValChange}
                          className="toggleTabs"
                          centered={true}
                          textColor={"primary"}
                    >
                        <Tab label="Table Display"/>
                        <Tab label="Gauges Display"/>
                    </Tabs>
                </Paper>
                <br/>
                <br/>
                <SwipeableViews index={tabVal} onChangeIndex={handleSwipe} className="displaySwipeDiv">
                    <RiskCalculatorResultsTableDisplayComponent inputs={props.inputs}
                                                                comparisonModeState={props.comparisonModeState}
                                                                comparisonInputs={props.comparisonInputs}/>
                    <RiskCalculatorResultsGaugesDisplayComponent inputs={props.inputs}
                                                                 comparisonModeState={props.comparisonModeState}
                                                                 comparisonInputs={props.comparisonInputs}/>
                </SwipeableViews>
            </Container>
        </div>
    )
}
