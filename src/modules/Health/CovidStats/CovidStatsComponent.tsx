import {
    ArgumentAxis,
    Chart,
    LineSeries,
    ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import {
    Container,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Tabs,
    Typography,
} from "@material-ui/core";
import moment, { MomentInput } from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { updateCovidInfos } from "../../../actions/covidInfos";
import { CovidInfos } from "../../../utils/CovidInfo";
import { fetchCovidInfos } from "./CovidInfosUtil";
import "./styles.css";

const formatDate = (date: MomentInput) =>
    moment(date, "YYYYMMDD").format("MMM Do YYYY");

interface SerisToChartProps {
    data?: any[];
}
const SerisToChart: React.FC<SerisToChartProps> = (props) => {
    return (
        <Chart data={props.data}>
            <ArgumentAxis
                tickFormat={(scale) => (tick) => {
                    return moment(tick, "X").format("MMM Do YYYY");
                }}
            />
            <ValueAxis />
            {props.children}
            <Animation />
        </Chart>
    );
};

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const CovidStatsComponent: React.FC = () => {
    const dispatch = useDispatch();
    const [covidInfos, setCovidInfos] = useState(
        useSelector<any, CovidInfos>((state) => state.covidInfos.slice())
    );

    const [deathTableOrderBy, setDeathTableOrderBy] = useState("date");
    const [deathTableOrder, setDeathTableOrder] = React.useState<Order>("desc");
    const [chartTab, setChartTab] = useState(0);
    const [chartSubTab, setChartSubTab] = useState(0);
    const [chartTotalTab, setChartTotalTab] = useState(0);
    useEffect(() => {
        (async () => {
            try {
                const infos = await fetchCovidInfos();
                setCovidInfos(() => {
                    return infos.map((info) => {
                        const date = info.date;
                        info.dateTimeStamp = parseInt(
                            moment(date, "YYYYMMDD").format("X")
                        );
                        return { ...info };
                    });
                });
                dispatch(updateCovidInfos(infos));
            } catch (e) {
                setCovidInfos((infos) => {
                    return infos.map((info) => {
                        const date = info.date;
                        info.dateTimeStamp = parseInt(
                            moment(date, "YYYYMMDD").format("X")
                        );
                        return { ...info };
                    });
                });
            }
        })().then();
    }, [dispatch]);

    const handleDeathTableSortChange = (orderBy: string) => {
        const isDesc =
            orderBy === deathTableOrderBy && "desc" === deathTableOrder;
        setDeathTableOrderBy(orderBy);
        setDeathTableOrder(isDesc ? "asc" : "desc");
    };

    const handleChartTabChange = (
        event: React.ChangeEvent<{}>,
        newValue: number
    ) => {
        setChartTab((value) => newValue);
        setChartTotalTab(newValue * 2 + chartSubTab);
    };

    const handleChartSubTabChange = (
        event: React.ChangeEvent<{}>,
        newValue: number
    ) => {
        setChartSubTab((value) => newValue);
        setChartTotalTab(chartTab * 2 + newValue);
    };

    const handleChartSwipe = (index: number) => {
        setChartTab(index / 2);
        setChartSubTab(index % 2);
        setChartTotalTab(index);
    };

    const createTableTitleCell = (title: string, field: string) => {
        return (
            <TableCell
                align="right"
                sortDirection={
                    deathTableOrderBy === field ? deathTableOrder : false
                }
            >
                <TableSortLabel
                    active={deathTableOrderBy === field}
                    direction={
                        deathTableOrderBy === field ? deathTableOrder : "desc"
                    }
                    onClick={() => handleDeathTableSortChange(field)}
                >
                    {title}
                </TableSortLabel>
            </TableCell>
        );
    };

    return (
        <div className="CovidStatsComponent">
            <Container maxWidth="md">
                <Typography variant="h4">US Covid-19 Stats</Typography>
                <br />
                <br />
                <Paper square>
                    <Tabs
                        value={chartTab}
                        onChange={handleChartTabChange}
                        className="toggleTabs"
                        centered={true}
                        textColor={"primary"}
                    >
                        <Tab label="Positives" value={0} />
                        <Tab label="Hospitalized" value={1} />
                        <Tab label="Deaths" value={2} />
                    </Tabs>
                </Paper>
                <br />

                <Paper square>
                    <Tabs
                        value={chartSubTab}
                        onChange={handleChartSubTabChange}
                        className="toggleTabs"
                        centered={true}
                        textColor={"primary"}
                    >
                        <Tab label="Total Amount" value={0} />
                        <Tab label="Rate Increase" value={1} />
                    </Tabs>
                </Paper>
                <br />
                <br />
                <Paper>
                    <SwipeableViews
                        index={chartTotalTab}
                        onChangeIndex={handleChartSwipe}
                    >
                        <SerisToChart data={covidInfos}>
                            <LineSeries
                                valueField="positive"
                                argumentField="dateTimeStamp"
                            />
                        </SerisToChart>

                        <SerisToChart data={covidInfos}>
                            <LineSeries
                                valueField="hospitalized"
                                argumentField="dateTimeStamp"
                                color="orange"
                            />
                        </SerisToChart>

                        <SerisToChart data={covidInfos}>
                            <LineSeries
                                valueField="death"
                                argumentField="dateTimeStamp"
                                color="red"
                            />
                        </SerisToChart>

                        <SerisToChart data={covidInfos}>
                            <LineSeries
                                valueField="positiveIncrease"
                                argumentField="dateTimeStamp"
                                color="green"
                            />
                        </SerisToChart>

                        <SerisToChart data={covidInfos}>
                            <LineSeries
                                valueField="hospitalizedIncrease"
                                argumentField="dateTimeStamp"
                                color="violet"
                            />
                        </SerisToChart>

                        <SerisToChart data={covidInfos}>
                            <LineSeries
                                valueField="deathIncrease"
                                argumentField="dateTimeStamp"
                                color="yellow"
                            />
                        </SerisToChart>
                    </SwipeableViews>
                </Paper>
                <br />
                <br />
                <Paper>
                    <TableContainer className="CovidStatsTable">
                        <Table aria-label="death table">
                            <TableHead>
                                <TableRow>
                                    {createTableTitleCell("Date", "date")}
                                    {createTableTitleCell(
                                        "Positives",
                                        "positive"
                                    )}
                                    {createTableTitleCell(
                                        "Hospitalized",
                                        "hospitalized"
                                    )}
                                    {createTableTitleCell("Death", "death")}
                                    {createTableTitleCell(
                                        "Positives Increase",
                                        "positiveIncrease"
                                    )}
                                    {createTableTitleCell(
                                        "Hospitalized Increase",
                                        "hospitalizedIncrease"
                                    )}
                                    {createTableTitleCell(
                                        "Death Increase",
                                        "deathIncrease"
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stableSort(
                                    covidInfos,
                                    getComparator(
                                        deathTableOrder,
                                        deathTableOrderBy
                                    )
                                ).map((info, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                align="left"
                                            >
                                                {formatDate(info.date)}
                                            </TableCell>
                                            {[
                                                "positive",
                                                "hospitalized",
                                                "death",
                                                "positiveIncrease",
                                                "hospitalizedIncrease",
                                                "deathIncrease",
                                            ].map((name) => {
                                                return (
                                                    <TableCell
                                                        align="right"
                                                        key={`${i}${name}`}
                                                    >
                                                        {info[name] || 0}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <br />
            </Container>
        </div>
    );
};

export default CovidStatsComponent;
