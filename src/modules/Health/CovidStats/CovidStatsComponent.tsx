import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCovidInfos } from "../../../actions/covidInfos";
import { CovidInfo, CovidInfos } from "../../../utils/CovidInfo";
import { fetchCovidInfos } from "./CovidInfosUtil";
import "./styles.css";

const CovidStatsComponent: React.FC = () => {
    const dispatch = useDispatch();
    const [covidInfos, setCovidInfos] = useState(
        useSelector<any, CovidInfos>((state) => state.covidInfos.slice())
    );
    useEffect(() => {
        (async () => {
            try {
                const infos = await fetchCovidInfos();
                setCovidInfos(infos);
                dispatch(updateCovidInfos(infos));
            } catch (e) {}
        })().then();
    }, [dispatch]);

    return (
        <div className="CovidStatsComponent">
            <Container maxWidth="md">
                <Typography variant="h4">Covid Stats</Typography>
                <br />
                <br />
                <Paper>
                    <TableContainer className="CovidStatsTable">
                        <Table aria-label="death table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="right">
                                        Death Count
                                    </TableCell>
                                    <TableCell align="right">
                                        Positives Count
                                    </TableCell>
                                    <TableCell align="right">
                                        Death Increase
                                    </TableCell>
                                    <TableCell align="right">
                                        Positives Increase
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {covidInfos.map((info: CovidInfo, i) => {
                                    const date = moment(info.date, "YYYYMMDD");
                                    const dateFormatted = date.format(
                                        "MMM Do YYYY"
                                    );
                                    return (
                                        <TableRow key={i}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {dateFormatted}
                                            </TableCell>
                                            <TableCell align="right">
                                                {info.death}
                                            </TableCell>
                                            <TableCell align="right">
                                                {info.positive}
                                            </TableCell>
                                            <TableCell align="right">
                                                {info.deathIncrease}
                                            </TableCell>
                                            <TableCell align="right">
                                                {info.hospitalizedIncrease}
                                            </TableCell>
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
