import React from 'react';
import attributionsText from '../../../static-assets/oss.json';
import {Container} from "@material-ui/core";
import './styles.css';

export default function OssAttributionsComponent() {
    return (
        <div className="OssAttributionsComponent">
            <Container maxWidth="md">
                <pre className='OssAttributionsComponentPre'>
                    {attributionsText.text}
                </pre>
            </Container>
        </div>
    )
}



