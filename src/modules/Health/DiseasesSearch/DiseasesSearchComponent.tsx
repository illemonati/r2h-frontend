import React, { useState, ChangeEvent, useEffect, Fragment } from "react";
import {
    Typography,
    Container,
    Paper,
    Grid,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Switch,
    InputAdornment,
} from "@material-ui/core";
import Disease from "../../../utils/Disease";
import DiseasesSearchDiseaseInfoComponent from "./DiseasesSearchDiseaseInfo/DiseasesSearchDiseaseInfoComponent";

export default () => {
    const [query, setQuery] = useState("");
    const possibleFields = ["name", "about", "symptoms", "people_at_risk"];
    const [fieldsUsed, setFieldsUsed] = useState([] as string[]);
    const [results, setResults] = useState([] as (string | number)[][]);
    const [infoDialogState, setInfoDialogState] = useState([] as boolean[]);
    const [limit, setLimit] = useState(10);
    const [useAnd, setUseAnd] = useState(false);

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.currentTarget.value;
        setQuery(() => newQuery);
    };

    const handleUseAndChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newState = e.currentTarget.checked;
        setUseAnd(() => newState);
    };

    const handleLimitChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newLimit = parseInt(e.currentTarget.value) || 0;
        setLimit(newLimit);
    };

    const handleInfoDialogStateChange = (index: number, newState: boolean) => {
        setInfoDialogState((state) => {
            state[index] = newState;
            return [...state];
        });
    };

    const handleFieldChange = (fieldName: string) => (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const checked = e.currentTarget.checked;
        if (checked && !fieldsUsed.includes(fieldName)) {
            setFieldsUsed((fields) => {
                return [...fields, fieldName];
            });
        } else if (!checked && fieldsUsed.includes(fieldName)) {
            setFieldsUsed((fields) => {
                return fields.filter((field) => field !== fieldName);
            });
        }
    };

    const updateResults = async (
        query: string,
        fields: string[],
        limit: number
    ) => {
        const endpoint = "/diseases";

        if (fieldsUsed.length < 1 || limit < 1 || query.length < 1) {
            setResults([]);
            return;
        }

        const resp = await fetch(endpoint, {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({
                query: query,
                fields: fieldsUsed,
                limit: limit,
                useAnd: useAnd,
            }),
        });
        const res = await resp.json();
        const sortable = [];
        for (const disease in res) {
            sortable.push([disease, res[disease]]);
        }

        sortable.sort(function (a, b) {
            return b[1] - a[1];
        });
        // console.log(sortable);
        setResults(sortable);
    };

    useEffect(() => {
        // console.log(query);
        // console.log(fieldsUsed);
        updateResults(query, fieldsUsed, limit)
            .then()
            .catch((e) => {});
        // eslint-disable-next-line
    }, [query, fieldsUsed, limit, useAnd]);

    return (
        <div className="DiseasesSearch">
            <Container maxWidth="md">
                <Typography variant="h4">Diseases Search</Typography>
                <br />
                <br />
                <Paper variant="outlined">
                    <br />
                    <Container>
                        <Grid
                            container
                            className="DiseasesSearchComponentMainGrid"
                            spacing={3}
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={12}>
                                <TextField
                                    label="Query"
                                    value={query}
                                    onChange={handleQueryChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="number"
                                    value={limit}
                                    onChange={handleLimitChange}
                                    label="Limit"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                Entries
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                item
                                container
                                xs={12}
                                alignItems="flex-start"
                                alignContent="flex-start"
                            >
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={useAnd}
                                            onChange={handleUseAndChange}
                                            color="primary"
                                        />
                                    }
                                    label="Use Conjunction"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormGroup row>
                                    {possibleFields.map((field, i) => {
                                        return (
                                            <FormControlLabel
                                                key={i}
                                                control={
                                                    <Checkbox
                                                        checked={fieldsUsed.includes(
                                                            field
                                                        )}
                                                        onChange={handleFieldChange(
                                                            field
                                                        )}
                                                    />
                                                }
                                                label={field}
                                            />
                                        );
                                    })}
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <List>
                                    {results.map((result, i) => {
                                        const disease = JSON.parse(
                                            result[0] as string
                                        ) as Disease;
                                        // console.log(disease);
                                        return (
                                            <Fragment key={i}>
                                                <ListItem
                                                    button
                                                    onClick={() => {
                                                        handleInfoDialogStateChange(
                                                            i,
                                                            true
                                                        );
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={disease.name}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <Typography variant="subtitle1">
                                                            {(result[1] as number).toFixed(
                                                                2
                                                            )}
                                                        </Typography>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                                <DiseasesSearchDiseaseInfoComponent
                                                    open={infoDialogState[i]}
                                                    handleClose={() =>
                                                        handleInfoDialogStateChange(
                                                            i,
                                                            false
                                                        )
                                                    }
                                                    disease={disease}
                                                />
                                            </Fragment>
                                        );
                                    })}
                                </List>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
                <br />
                <br />
            </Container>
        </div>
    );
};
