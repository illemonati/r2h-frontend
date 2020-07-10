import React from "react";
import {Snackbar} from "@material-ui/core";


interface LoadingSnackBarComponentProps {
    message: string
}

const LoadingSnackBarComponent = (props: LoadingSnackBarComponentProps) => {
    return (
        <div className="LoadingSnackBarComponent">

            <Snackbar open={props.message.length > 0}
                      anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                      }}
                      message={props.message}
            />
        </div>
    )
}

export default LoadingSnackBarComponent;
