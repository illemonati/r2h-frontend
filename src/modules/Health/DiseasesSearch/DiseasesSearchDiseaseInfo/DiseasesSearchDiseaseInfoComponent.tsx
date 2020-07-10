import React, { Fragment } from "react";
import Disease from "../../../../utils/Disease";
import {
    DialogTitle,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@material-ui/core";

interface DiseasesSearchDiseaseInfoComponentProps {
    open?: boolean;
    handleClose: () => void;
    disease: Disease;
}

export default (props: DiseasesSearchDiseaseInfoComponentProps) => {
    const open = props.open || false;
    const handleClose = props.handleClose;
    const disease = props.disease;

    const getSection = (sectionName: string, sectionTitle: string) => {
        return (
            <Fragment>
                <Typography variant="subtitle1">{sectionTitle}</Typography>
                <br />
                {((disease[sectionName] as string[]) || []).map(
                    (section, i) => {
                        return (
                            <Fragment key={i}>
                                <Typography variant="body2">
                                    {section}
                                </Typography>
                                <br />
                            </Fragment>
                        );
                    }
                )}
            </Fragment>
        );
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>{disease.name}</DialogTitle>
            <DialogContent dividers={true}>
                {disease.about && getSection("about", "About")}
                {disease.symptoms && getSection("symptoms", "Symptoms")}
                {disease.people_at_risk &&
                    getSection("people_at_risk", "People at Risk")}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
