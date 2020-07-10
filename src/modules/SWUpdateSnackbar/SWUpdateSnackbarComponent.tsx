import React from "react";
import {Button, Snackbar} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {swUpdated} from "../../actions/SWUpdate";

interface SWUpdateSnackbarComponentProps {
    waitingSW: ServiceWorker | null
}


export default function SWUpdateSnackbarComponent(props: SWUpdateSnackbarComponentProps) {

    const dispatch = useDispatch();

    const handleClose = (event: React.SyntheticEvent | MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        updateSW();
    };

    const updateAction = (
        <Button color="secondary" size="small" onClick={handleClose}>
            UPDATE
        </Button>
    );

    const updateSW = () => {
        console.log(props.waitingSW);
        props.waitingSW?.addEventListener('statechange', (e) => {
            //@ts-ignore
            if (e.target.state === 'activated') {
                dispatch(swUpdated());
                window.location.reload();
            }

        });
        props.waitingSW?.postMessage({type: 'SKIP_WAITING'});
    };



    return (
        <Snackbar open={(props.waitingSW !== null)}
                  onClose={handleClose}
                  message={"New Update Available"}
                  action={updateAction}
        />
    );
}

