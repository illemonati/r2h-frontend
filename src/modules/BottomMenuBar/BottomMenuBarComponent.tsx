import React, {ChangeEvent, useState} from "react";
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@material-ui/icons/Settings';
import './styles.css';
import {useDispatch, useSelector} from "react-redux";
import {updateBottomMenuState} from "../../actions/bottomMenuState";
import {Link} from "react-router-dom";


export default function BottomMenuBarComponent() {
    const [val, setVal] = useState(useSelector<any, number>(state => state.bottomMenuState));
    const dispatch = useDispatch();
    const handleChange = (event: ChangeEvent<{}>, newVal: number) => {
        setVal(newVal);
        dispatch(updateBottomMenuState(newVal));
    };
    return (
        <>
            <BottomNavigation
                value={val}
                onChange={handleChange}
                showLabels
                className="bottomNavActions"
            >
                <BottomNavigationAction label="home"
                                        icon={<HomeIcon/>}
                                        component={Link}
                                        to="/"

                />
                <BottomNavigationAction label="Lifestyle"
                                        icon={<FaceIcon />}
                                        component={Link}
                                        to="/lifestyle"
                />
                <BottomNavigationAction label="Health"
                                        icon={<FavoriteIcon />}
                                        component={Link}
                                        to="/health"
                />
                <BottomNavigationAction label="Settings"
                                        icon={<SettingsIcon />}
                                        component={Link}
                                        to="/settings"
                />
            </BottomNavigation>
        </>
    )
}


