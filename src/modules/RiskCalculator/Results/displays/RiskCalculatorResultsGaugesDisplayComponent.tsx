import React, {useEffect, useRef} from 'react';
import {RiskCalculatorResultsComponentProps} from '../shared';
import * as d3 from 'd3';
import {Grid, Paper, Theme, Typography} from '@material-ui/core';
import {calculateCardiacRisk, calculateMortalityRisk} from '../../utils';
import {useTheme} from '@material-ui/core/styles';

export default function RiskCalculatorResultsGaugesDisplayComponent(
    props: RiskCalculatorResultsComponentProps) {
    return (
        <div className="RiskCalculatorResultsGaugesDisplayComponent">
            <Grid container spacing={2} className="GaugeGrid">
                <Grid item xs={props.comparisonModeState ? 6 : 12}>
                    <Paper variant="outlined">
                        <DiagramComponent
                            yourRisk={calculateMortalityRisk(props.inputs)}
                            averageRisk={0.13}
                            name="Risk of death within 30 days - average = 0.13%"
                        />
                    </Paper>
                </Grid>
                {props.comparisonModeState && (
                    <Grid item xs={6}>
                        <Paper variant="outlined">
                            <DiagramComponent
                                yourRisk={calculateMortalityRisk(
                                    props.comparisonInputs
                                )}
                                averageRisk={0.13}
                                name="Risk of death within 30 days - average = 0.13%"
                            />
                        </Paper>
                    </Grid>
                )}
                <Grid item xs={props.comparisonModeState ? 6 : 12}>
                    <Paper variant="outlined">
                        <DiagramComponent
                            yourRisk={calculateCardiacRisk(props.inputs)}
                            averageRisk={0.29}
                            name="Risk of Cardiac Complications within 30 days - average = 0.29%"
                        />
                    </Paper>
                </Grid>
                {props.comparisonModeState && (
                    <Grid item xs={6}>
                        <Paper variant="outlined">
                            <DiagramComponent
                                yourRisk={calculateCardiacRisk(
                                    props.comparisonInputs
                                )}
                                averageRisk={0.29}
                                name="Risk of Cardiac Complications within 30 days - average = 0.29%"
                            />
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}

interface DiagramProps {
    yourRisk: number;
    averageRisk: number;
    name: string;
}

function DiagramComponent(props: DiagramProps) {
    const diagramNode = useRef<SVGSVGElement | null>(null);
    const theme = useTheme();
    useEffect(() => {
        const diagram = createDiagram(props.yourRisk, props.averageRisk, theme);
        diagramNode.current!.innerHTML = diagram.innerHTML;
        diagramNode.current!.style.width = diagram.style.width;
    });
    return (
        <div>
            <Typography variant="subtitle1">{props.name}</Typography>
            <br/>
            <svg ref={diagramNode}/>
        </div>
    );
}

function createDiagram(yourRisk: number, averageRisk: number, theme: Theme) {

    const svg = d3.create('svg');
    const arcRadius = 50;
    const arcWidth = 15;
    const arcGen = d3.arc();
    const outlinePathData = arcGen({
        startAngle: -Math.PI / 2,
        endAngle: Math.PI / 2,
        innerRadius: arcRadius,
        outerRadius: arcRadius + arcWidth,
    });

    // yourRisk = averageRisk + 1;
    // yourRisk = averageRisk + 50;
    // yourRisk = averageRisk;
    // const calculatedRiskWith50AsAverage = (yourRisk + 50 - averageRisk);
    const differenceFromAverage = yourRisk - averageRisk;
    const scaledDiff =
        (100 * (differenceFromAverage + 4 * averageRisk)) / (8 * averageRisk) -
        50;
    // console.log(`${differenceFromAverage}, ${scaledDiff}`)

    // console.log(calculatedRiskWith50AsAverage);

    const yourRiskPathData = arcGen({
        startAngle: -Math.PI / 2,
        endAngle:
            Math.PI * ((Math.max(Math.min(scaledDiff, 50), -50) + 50) / 100) -
            Math.PI / 2,
        innerRadius: arcRadius,
        outerRadius: arcRadius + arcWidth,
    });






    svg.append('path')
        .attr('d', outlinePathData!)
        .attr('stroke-width', 4)
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 1)
        .attr('stroke', theme.palette.primary.main)
        .attr(
            'transform',
            `translate(${arcRadius + arcWidth}, ${
                1.5 * (arcRadius + arcWidth)
            })`
        );
    svg.append('path')
        .attr('d', yourRiskPathData!)
        .attr(
            'fill',
            yourRisk > averageRisk
                ? theme.palette.error.main
                : yourRisk === averageRisk
                ? theme.palette.warning.main
                : theme.palette.success.main
        )
        .attr(
            'transform',
            `translate(${arcRadius + arcWidth}, ${
                1.5 * (arcRadius + arcWidth)
            })`
        );

    const marks = [0, 1, 2, 3, 4];

    marks.forEach((mark, i) => {

        const markData = arcGen({
            startAngle: -Math.PI / 2,
            endAngle: (-Math.PI / 2) + (Math.PI / 4) * i,
            innerRadius: arcRadius,
            outerRadius: arcRadius + arcWidth,
        });

        svg.append('path')
            .attr('d', markData!)
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 1)
            .attr('stroke-width', 4)
            .attr(
                'stroke',
                theme.palette.primary.main
            )
            .attr(
                'transform',
                `translate(${arcRadius + arcWidth}, ${
                    1.5 * (arcRadius + arcWidth)
                })`
            );
    });

    svg.append('text')
        .attr('x', (arcRadius + arcWidth) / 2)
        .attr('y', (arcRadius + arcWidth) * 2)
        .attr('fill', theme.palette.text.primary)
        .text(yourRisk.toFixed(4) + '%');
    svg.append('text')
        .attr('x', (arcRadius + arcWidth) * 0.2)
        .attr('y', (arcRadius + arcWidth) * 0.25)
        .attr('fill', theme.palette.text.primary)
        .text(yourRisk > averageRisk ? 'Above Average' : 'Below Average');
    const node = svg.node()!;
    node.style.width = `${(arcWidth + arcRadius) * 2}px`;
    return node;
}
