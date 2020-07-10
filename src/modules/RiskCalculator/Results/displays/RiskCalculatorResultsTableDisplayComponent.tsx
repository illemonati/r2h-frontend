import React from "react";
import {calculateCardiacRisk, calculateMortalityRisk} from "../../utils";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {RiskCalculatorResultsComponentProps} from "../shared";




export default function RiskCalculatorResultsTableDisplayComponent(props: RiskCalculatorResultsComponentProps) {
    return (
        <div className="RiskCalculatorResultsTableDisplayComponent">
            <br />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead >
                        <TableRow>
                            <TableCell>Results</TableCell>
                            <TableCell align="left">Your Risk (%)</TableCell>
                            {props.comparisonModeState && (
                                <TableCell align="left">Comparison Risk (%)</TableCell>
                            )}
                            <TableCell align="left">Population Average Risk</TableCell>
                            {/*<TableCell align="left">Model Accuracy</TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Risk of death within 30 days</TableCell>
                            <TableCell align="left">{calculateMortalityRisk(props.inputs).toFixed(2)}%</TableCell>
                            {props.comparisonModeState && (
                                <TableCell align="left">{calculateMortalityRisk(props.comparisonInputs).toFixed(2)}%</TableCell>
                            )}
                            <TableCell align="left">Average Population Risk is 0.13% or 1.3 per thousand</TableCell>
                            {/*<TableCell align="left">C-statistic = 0.73</TableCell>*/}
                        </TableRow>
                        <TableRow>
                            <TableCell>Risk of Cardiac Complications within 30 days</TableCell>
                            <TableCell align="left">{calculateCardiacRisk(props.inputs).toFixed(2)}%</TableCell>
                            {props.comparisonModeState && (
                                <TableCell align="left">{calculateCardiacRisk(props.comparisonInputs).toFixed(2)}%</TableCell>
                            )}
                            <TableCell align="left">Average Population Risk is 0.29% or 2.9 per thousand</TableCell>
                            {/*<TableCell align="left">C-statistic = 0.69</TableCell>*/}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
