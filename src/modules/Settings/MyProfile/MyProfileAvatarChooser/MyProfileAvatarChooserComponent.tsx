import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    GridList,
    GridListTile, GridListTileBar, IconButton
} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import './styles.css';
import avatars from "../avatars";


interface MyProfileAvatarChooserComponentProps {
    avatars: {[key: string]: any},
    avatarSelected: string,
    open: boolean,
    avatarCallBack: (url: string) => any,
    setOpenState: (state: boolean) => any
}



export default function MyProfileAvatarChooserComponent(props: MyProfileAvatarChooserComponentProps) {
    return (
        <Dialog open={props.open} onClose={() => props.setOpenState(false)}>
            <DialogTitle>
                Choose an Avatar
            </DialogTitle>
            <DialogContent>
                <GridList cellHeight={180}>
                    {Object.keys(props.avatars).map((avatar, i) => {
                        const iconButtonClass = (props.avatarSelected === avatar) ? "MyProfileAvatarChooserComponentCheckIconChecked" : "MyProfileAvatarChooserComponentCheckIcon";
                        return (
                            <GridListTile key={i} onClick={() => props.avatarCallBack(avatar)}>
                                <img src={avatars[avatar]}
                                     alt={avatar}
                                     className="MyProfileAvatarChooserComponentAvatarImage"
                                />
                                <GridListTileBar title={avatar}
                                                 actionIcon={
                                                     <IconButton className={iconButtonClass}
                                                                 onClick={() => props.avatarCallBack(avatar)}
                                                                 aria-label={`choose ${avatar}`}>
                                                         <CheckIcon/>
                                                     </IconButton>
                                                 }
                                />
                            </GridListTile>
                        )
                    })}
                </GridList>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpenState(false)} color="primary">
                    Done!
                </Button>
            </DialogActions>
        </Dialog>
    )
}


