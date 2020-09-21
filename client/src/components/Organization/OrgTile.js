import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router-dom";

const OrgTile = (props) => {
    console.log(props.org)
    const history = useHistory();
    return (
        <div style={{ cursor: 'pointer' }}
            onClick={() => {
                history.push(`/org/${props.org.id}/home`);
            }}>
            <Grid container spacing={2}>

                <Grid col={4}>
                </Grid>
                <Grid col={8}>
                    <h2>{props.org.orgname}</h2>
                    <text>{props.org.location}</text>
                </Grid>
            </Grid>
        </div>
    )
}

export default OrgTile
